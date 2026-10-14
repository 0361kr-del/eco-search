export function createConfig(value) {
  const url = String(value).trim();
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url)) {
    throw new Error('Apps Script에서 배포한 https://script.google.com/macros/s/…/exec 주소를 입력해 주세요. /dev 주소나 시트 주소는 사용할 수 없습니다.');
  }
  return `export const CONFIG = Object.freeze({
  API_URL: ${JSON.stringify(url)},
  FALLBACK_URL: './data/fallback.json',
  ALLOW_FALLBACK: false,
  INITIAL_BATCH_SIZE: 12,
  LOAD_MORE_SIZE: 10,
  MIN_QUERY_LENGTH: 1,
  REQUEST_TIMEOUT_MS: 30000,
  CACHE_VERSION: '1',
});
`;
}
