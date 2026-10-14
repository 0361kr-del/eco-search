# NAMSAN — 선생님별 독립 운영 안내

각 선생님이 본인 Google 시트와 GitHub Pages 사이트를 만들어 운영하는 배포본입니다. 로그인 없는 학생 검색, 관련 검색어·해시태그, 자료 상세 읽기, 검색 결과 추가 로딩을 제공합니다. 첫 화면에는 NAMSAN 로고와 검색창만 있습니다. 정답·신뢰도 판정, 학생 계정, 검색 기록 수집 기능은 없습니다.

## 준비물

- 선생님 개인의 Google 계정, GitHub 계정, 설치용 PC.
- 학교 계정은 Apps Script 웹 앱의 익명 접근을 허용하는지 확인합니다.
- 본인이 공개할 수 있는 수업 자료. 이 묶음은 기존 운영자의 시트·API·기사 250건을 포함하지 않고 **빈 자료 목록**으로 시작합니다.

설치 안내와 설정 파일 생성: https://0361kr-del.github.io/eco-search/teachers/

## 1. 내 자료 시트 생성

1. 새 Google 스프레드시트를 만들고 이름을 정합니다. 원본 시트의 공유는 제한됨으로 유지합니다.
2. **확장 프로그램 → Apps Script**를 열고 기본 코드를 지웁니다.
3. 이 폴더의 `apps-script/Code.gs` 전체 코드를 붙여 넣고 저장합니다. 반드시 시트에서 연 스크립트여야 합니다.
4. 시트의 파일 → 설정과 스크립트의 프로젝트 설정에서 시간대를 **서울 / Asia/Seoul**로 맞춥니다.
5. 함수 목록에서 `setupArticlesSheet`를 선택해 실행하고 본인 계정의 권한을 승인합니다. 자신의 시트에 연결된 코드를 확인한 뒤 승인하세요.
6. 생성된 `articles` 탭의 2행부터 자료를 입력합니다. 체크한 `published` 행만 학생에게 공개됩니다. 생성 함수는 처음 한 번만 실행하며, 내용이 있는 articles는 덮어쓰지 않습니다.

첫 연결 확인용으로 A2에 `test-001`, B2에 `연결 확인`, D2에 `내 시트의 자료입니다.`를 입력하고 L2의 체크박스를 체크하세요. 연결 확인 후 시험 행을 삭제합니다.

## 2. 읽기 전용 API 배포

1. Apps Script에서 **배포 → 새 배포 → 유형 선택 → 웹 앱**.
2. 실행 사용자 **나**, 액세스 권한 **모든 사용자**를 선택합니다. 로그인한 사용자만 허용하는 설정으로는 익명 요청을 읽을 수 없습니다.
3. 배포·승인 후 웹 앱의 `/exec` URL을 복사합니다. `/dev`나 스프레드시트 주소를 복사하지 않습니다.
4. 시크릿 창에서 그 주소를 열고 `updatedAt`과 `items`가 있는 JSON이 나오는지 확인합니다. 로그인 화면이면 권한 설정을 다시 확인합니다.
5. 배포 안내 페이지의 설정 생성기에 그 주소를 넣어 `config.js`를 내려받습니다. 또는 압축을 푼 `docs/config.js`의 빈 `API_URL` 문자열에 주소를 직접 넣습니다.
6. 내려받은 파일로 **docs/config.js**를 교체합니다. 중복 다운로드로 이름이 `config (1).js`가 되면 정확히 `config.js`로 바꿉니다. 설정 생성기는 URL 형식만 검사하며 실제 API 연결은 배포 후 검색으로 확인합니다.

API URL은 학생이 읽는 공개 주소입니다. 시트 주소·편집 권한·비밀번호·토큰은 설정에 넣지 않습니다. 공개 필드 허용 목록은 teacherCategory, difficulty, 셀 메모 및 추가 교사용 열을 제외합니다. published FALSE 행도 반환하지 않습니다.

## 3. 내 GitHub Pages 배포

1. https://github.com/new 에서 새 **Public** 저장소를 만듭니다. 예: `class-search`.
2. 저장소의 **uploading an existing file** 또는 **Add file → Upload files**를 누릅니다.
3. 압축을 푼 `namsan-starter` 폴더 **안의 파일과 폴더**를 드래그해 업로드합니다. ZIP 파일이나 바깥쪽 폴더 하나만 올리지 않습니다.
4. Commit changes로 저장한 뒤, 저장소 최상위에 `docs`, `apps-script`, `README.md`가 있는지 확인합니다. `docs` 안에 `index.html`, 설정한 `config.js`, `js` 폴더 등이 있어야 합니다.
5. **Settings → Pages → Source: Deploy from a branch**. 브랜치는 `main`(기본 브랜치가 다르면 그 이름), 폴더는 **/docs**를 선택하고 Save합니다.
6. 배포가 끝나면 Pages의 사이트 주소를 엽니다. 예: `https://내계정.github.io/class-search/`. 사이트 주소에 `/docs/`를 붙이지 않습니다.

이 배포본은 별도 빌드 명령이나 패키지 설치가 필요 없습니다. 원래 운영 저장소의 GitHub Actions 방식과 달리, 받는 선생님은 /docs 폴더를 게시합니다. 첫 배포가 보이지 않으면 Actions의 Pages 배포 상태를 확인하세요.

## 4. 확인 및 운영

- 시크릿 창에서 학생 사이트 접속 → `연결 확인` 검색 → 본문 확인.
- 자기 시트의 본문 수정 → 약 3분 뒤 새로고침 → 변경 확인.
- 시험 행의 published 해제 → 약 3분 뒤 새로고침 → 검색에서 사라지는지 확인.
- 시험 행 삭제 후 실제 자료 입력. 학생에게는 **사이트 주소만** 전달.
- 각자의 계정·배포 주소·시트를 사용해야 서로 독립적으로 운영됩니다.

평소에는 시트만 편집합니다. 자료 추가·삭제·태그 수정마다 사이트를 재배포할 필요가 없습니다. 열린 탭은 자동 갱신되지 않으므로 새로고침하세요. 바로 반영하려면 Apps Script 편집기에서 `clearArticleCache`를 실행한 뒤 새로고침합니다.

API 주소를 바꾸면 docs/config.js를 수정하고 GitHub에 반영해야 합니다. Apps Script 코드 자체를 바꾸면 배포 관리에서 기존 배포를 새 버전으로 갱신하세요. 각 복사본은 독립적이므로 원본 사이트의 코드 변경이 자동 적용되지는 않습니다.

## 자료 열 구조

탭 이름 `articles`, 1행 헤더는 생성 함수가 입력한 영문 이름을 유지합니다. 자료는 2행부터 입력합니다.

| 열 | 이름 | 입력 방법 |
|---|---|---|
| A | id | 중복 없는 ID. 예: a001 |
| B | title | 제목, 필수 |
| C | summary | 검색용 짧은 요약. 현재 화면에서는 미리보기로 표시하지 않음 |
| D | content | 전체 본문. 셀 안 줄바꿈 가능, HTML·Markdown 해석 없음 |
| E | source | 출처명. 미기입 시 학생에게 표시 없음으로 노출 |
| F | author | 작성자 |
| G | date | 날짜 또는 YYYY-MM-DD |
| H | image | 공개 HTTPS 이미지 주소 또는 직접 올린 이미지 상대 경로. 선택 |
| I | type | article, sns, chart, report, blog, photo, card 등 |
| J | tags | 상세 화면 해시태그와 검색어. 쉼표로 구분 |
| K | keywords | 추가 유사 검색어. 쉼표로 구분 |
| L | published | 체크하면 TRUE, 학생에게 공개 |
| M | feedWeight | 양수, 기본 1. 추천용 예약값이며 신뢰도 점수가 아님 |
| N | teacherCategory | 교사용 분류, 학생에게 전송하지 않음 |
| O | difficulty | easy / normal / hard, 학생에게 전송하지 않음 |

교사용 분류: valid, relevance_trap, source_trap, causality_trap, insufficient, dummy. 분류는 교사의 설계 도구이며 학생에게 정답 표식으로 제공하지 않습니다. 추가 교사용 메모 열도 API 허용 목록에 없으므로 전송하지 않습니다. 학생 이름 등 개인정보는 저장하지 마세요.

미세먼지 글의 tags에 `미세먼지,환경오염,대기오염`, keywords에 `공기오염,호흡,건강`을 넣을 수 있습니다. 실제 내용과 관계있는 표현을 사용하세요. title, summary, tags, keywords가 검색 대상입니다. 본문에만 단어를 넣으면 검색되지 않을 수 있습니다.

이미지가 없어도 검색·본문 읽기는 가능합니다. 이미지 주소는 시크릿 창에서 열리는 파일 주소를 사용하고 이용 조건을 확인하세요.

## 파일 구조

- `docs/`: 학생 사이트. index.html, style.css, app.js, config.js.
- `docs/js/`: 검색·API·카드·상세 보기 코드.
- `docs/data/fallback.json`: 빈 목록. 기존 운영 자료가 아님.
- `apps-script/Code.gs`: 전체 API 코드, 시트 생성, 캐시 초기화 함수.
- `README.md`: 이 안내서.

## 장애 해결

| 상황 | 확인할 것 |
|---|---|
| 결과 0개 | 빈 템플릿인지, published 체크, 제목·태그·keywords에 검색어가 있는지 |
| 자료 불러오기 오류 | config.js의 /exec URL, 익명 접근, articles 탭, 15개 헤더, 중복 id·공백 제목 |
| 수정 전 자료가 보임 | 약 3분 뒤 새로고침, 필요 시 clearArticleCache 실행 |
| 사이트 404 | Pages의 main /docs, 업로드 폴더 중첩, 배포 완료 여부 |
| 화면이 안 열림 | file:// 더블클릭 대신 실제 Pages 주소 사용 |
| 학교에서만 실패 | 학교 네트워크에서 script.google.com과 리디렉션 대상 허용 여부 |
| 모든 사용자 선택 불가 | 학교 관리자에게 익명 Apps Script 웹 앱 허용 정책 문의 |

이 배포본은 `ALLOW_FALLBACK: false`입니다. API 장애 때 오래되거나 다른 수업의 자료를 대신 보여 주지 않습니다. API 미설정 상태에서는 빈 JSON으로 시작합니다. 오프라인 대체 자료가 꼭 필요하면 공개 가능한 자체 스냅샷으로 fallback.json을 교체한 뒤 설정을 켜야 하며, 이 파일은 시트와 자동 동기화되지 않습니다.

시트는 비공개로 두더라도 API로 공개한 본문과 학생 사이트는 공개 자료입니다. 준비된 자료 안에서 검색하는 도구이며 인터넷 접근 자체를 막는 서비스는 아닙니다.

## 변경·확장

수업용으로 코드를 복사해 각자의 저장소에서 수정해 사용할 수 있습니다. NAMSAN 로고는 docs/index.html의 wordmark와 페이지 제목에서 바꿀 수 있습니다. 기사·사진 등 제3자 자료는 해당 출처의 이용 조건을 따릅니다.

추후 TODO: 원클릭 설치, 교사용 자료 입력 도구, 선택적 스냅샷 자동 갱신. 현재 최초 Google 승인과 GitHub Pages 설정은 각 계정 소유자가 직접 진행합니다.

## 공식 참고 자료

- GitHub Pages 게시 폴더 설정: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Apps Script 웹 앱 배포: https://developers.google.com/apps-script/guides/web
- API 응답 방식: https://developers.google.com/apps-script/guides/content

배포본 1.0 · 2026-10-14
