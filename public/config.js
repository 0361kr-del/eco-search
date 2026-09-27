export const CONFIG = Object.freeze({
  API_URL: '', // 배포된 Google Apps Script /exec URL. 비어 있으면 예시 자료 모드.
  FALLBACK_URL: './data/fallback.json',
  ALLOW_FALLBACK: true,
  INITIAL_BATCH_SIZE: 12,
  LOAD_MORE_SIZE: 10,
  MIN_QUERY_LENGTH: 1,
  REQUEST_TIMEOUT_MS: 12000,
  CACHE_VERSION: '1',
});
