export const normalize = value => String(value ?? '').normalize('NFKC').trim().toLowerCase();
export function searchItems(items, query) {
  const phrase = normalize(query);
  const terms = [...new Set(phrase.split(/\s+/).filter(Boolean))];
  if (!terms.length) return items;
  return items.map((item, index) => {
    const title = normalize(item.title), summary = normalize(item.summary);
    const tags = item.tags.map(normalize), keywords = item.keywords.map(normalize);
    let score = title === phrase ? 10 : 0;
    let matched = 0;
    for (const term of terms) {
      const points = (title.includes(term) ? 5 : 0) + (tags.includes(term) ? 4 : 0)
        + (keywords.includes(term) ? 3 : 0) + (summary.includes(term) ? 2 : 0);
      if (points > 0) matched++;
      score += points;
    }
    if (matched === terms.length) score += 5;
    return { item, score, index };
  }).filter(row => row.score > 0).sort((a,b) => b.score-a.score || a.index-b.index).map(row => row.item);
}
export function weightedOrder(items, random = Math.random) {
  return items.map(item => ({item, key: -Math.log(Math.max(Number.MIN_VALUE,random())) / Math.max(0.01, Number(item.feedWeight) || 1)}))
    .sort((a,b) => a.key-b.key).map(row => row.item);
}
