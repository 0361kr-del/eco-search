/** @OnlyCurrentDoc */
/** Bound to the teacher's private spreadsheet. Public response uses an allowlist. */
const SETTINGS = Object.freeze({SHEET_NAME: 'articles', CACHE_KEY: 'articles-public-v1', CACHE_SECONDS: 180, CHUNK_SIZE: 20000});
const HEADERS = ['id','title','summary','content','source','author','date','image','type','tags','keywords','published','feedWeight','teacherCategory','difficulty'];
function doGet() {
  const cache = CacheService.getScriptCache();
  let lock;
  try {
    let json = readCache_(cache);
    if (json) return jsonOutput_(json);
    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    json = readCache_(cache);
    if (json) return jsonOutput_(json);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETTINGS.SHEET_NAME);
    if (!sheet) throw new Error('Missing sheet');
    const values = sheet.getDataRange().getValues();
    const headers = values.shift().map(value => String(value).trim());
    if (new Set(headers).size !== headers.length || HEADERS.some(name => !headers.includes(name))) throw new Error('Invalid schema');
    const timezone = Session.getScriptTimeZone();
    const seen = new Set();
    const items = [];
    values.forEach(row => {
      const record = {};
      headers.forEach((name,index) => record[name] = row[index]);
      if (!(record.published === true || String(record.published).trim().toUpperCase() === 'TRUE')) return;
      const item = publicArticle_(record, timezone);
      if (!item.id || !item.title || seen.has(item.id)) throw new Error('Missing or duplicate id/title');
      seen.add(item.id);items.push(item);
    });
    json = JSON.stringify({updatedAt: new Date().toISOString(), items: items});
    // Cache quotas must not make an otherwise valid API response fail.
    try {writeCache_(cache,json);} catch (cacheError) {console.warn('Cache write skipped');}
    return jsonOutput_(json);
  } catch (error) {
    console.error('Article API failed');
    return jsonOutput_(JSON.stringify({error:'DATA_UNAVAILABLE'}));
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
function publicArticle_(record, timezone) {
  // Never spread a Sheet row: only these fields can cross the server boundary.
  const item = {};
  ['id','title','summary','content','source','author','image','type'].forEach(key => item[key] = String(record[key] == null ? '' : record[key]).trim());
  item.date = record.date instanceof Date ? Utilities.formatDate(record.date, timezone, 'yyyy-MM-dd') : String(record.date || '').trim();
  ['tags','keywords'].forEach(key => item[key] = String(record[key] || '').split(',').map(value => value.trim()).filter(Boolean));
  const weight = Number(record.feedWeight);
  item.feedWeight = Number.isFinite(weight) && weight > 0 ? weight : 1;
  return item;
}
function jsonOutput_(json) {return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);}
function readCache_(cache) {
  const raw = cache.get(SETTINGS.CACHE_KEY);
  if (!raw) return null;
  try {
    const manifest = JSON.parse(raw);
    if (!Array.isArray(manifest.keys) || !manifest.keys.length) return null;
    const parts = cache.getAll(manifest.keys);
    if (manifest.keys.some(key => typeof parts[key] !== 'string')) return null;
    return manifest.keys.map(key => parts[key]).join('');
  } catch (error) {return null;}
}
function writeCache_(cache, json) {
  // Korean UTF-8 content can exceed the 100 KB per-value limit. Small UTF-16
  // chunks fit under it; publish a generation manifest only after all chunks.
  const generation = Utilities.getUuid();
  const chunks = {}, keys = [];
  for (let offset=0; offset<json.length; offset+=SETTINGS.CHUNK_SIZE) {
    const key = SETTINGS.CACHE_KEY + ':' + generation + ':' + keys.length;
    keys.push(key);chunks[key] = json.slice(offset,offset+SETTINGS.CHUNK_SIZE);
  }
  if (keys.length > 100) return; // Very large datasets still return uncached.
  cache.putAll(chunks,SETTINGS.CACHE_SECONDS);
  cache.put(SETTINGS.CACHE_KEY,JSON.stringify({keys:keys}),SETTINGS.CACHE_SECONDS);
}
function clearArticleCache() {CacheService.getScriptCache().remove(SETTINGS.CACHE_KEY);}
/** Run once in the editor. Never exposed through doGet. Existing data is retained. */
function setupArticlesSheet() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const sheet=ss.getSheetByName(SETTINGS.SHEET_NAME) || ss.insertSheet(SETTINGS.SHEET_NAME);
  if (sheet.getLastRow() > 0) throw new Error('Sheet already contains data; import or edit it directly.');
  sheet.getRange(1,1,1,HEADERS.length).setValues([HEADERS]);sheet.setFrozenRows(1);
  sheet.getRange(1,1,1,HEADERS.length).setFontWeight('bold');
  sheet.getRange(2,12,999,1).insertCheckboxes();
  sheet.getRange(2,14,999,1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['valid','relevance_trap','source_trap','causality_trap','insufficient','dummy'],true).build());
  sheet.getRange(2,15,999,1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['easy','normal','hard'],true).build());
}
