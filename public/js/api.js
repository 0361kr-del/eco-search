export function sanitize(payload) {
  if (!payload || !Array.isArray(payload.items) || payload.error) throw new Error('Invalid payload');
  const ids = new Set();
  return payload.items.map(row => {
    if (!row || typeof row.id !== 'string' || !row.id || typeof row.title !== 'string' || !row.title || ids.has(row.id)) throw new Error('Invalid article');
    ids.add(row.id);
    const item = {};
    for (const key of ['id','title','summary','content','source','author','date','image','type']) item[key] = typeof row[key] === 'string' ? row[key] : '';
    for (const key of ['tags','keywords']) item[key] = Array.isArray(row[key]) ? row[key].filter(x=>typeof x === 'string') : [];
    item.feedWeight = Number.isFinite(Number(row.feedWeight)) ? Math.max(0.01,Number(row.feedWeight)) : 1;
    return item;
  });
}
async function request(url, config) {
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(),config.REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url,{signal:controller.signal,redirect:'follow',credentials:'omit',cache:'no-store'});
    if (!response.ok) throw new Error('HTTP '+response.status);
    return sanitize(await response.json());
  } finally {clearTimeout(timeout);}
}
export async function loadArticles(config) {
  if (!config.API_URL) return {items:await request(config.FALLBACK_URL,config), mode:'demo'};
  try {return {items:await request(config.API_URL,config), mode:'live'};}
  catch (error) {
    if (!config.ALLOW_FALLBACK) throw error;
    return {items:await request(config.FALLBACK_URL,config), mode:'fallback'};
  }
}
