# NAMSAN 자료 검색 — 6학년 과학

## 다른 선생님께 배포하기

**공유할 설치 안내:** https://0361kr-del.github.io/eco-search/teachers/

- [독립 운영 ZIP 내려받기](https://0361kr-del.github.io/eco-search/teachers/namsan-starter.zip)
- [교사용 설치·운영 안내](docs/TEACHER-GUIDE.md)

받는 선생님은 자신의 Google 시트와 Apps Script를 만들고, 안내 페이지에서 config.js를 생성한 뒤 자기 GitHub 저장소의 `main /docs`를 게시합니다. 기존 운영 API·운영 자료·교사용 분류는 배포 ZIP에 포함하지 않습니다. 빈 목록과 fallback 비활성화로 시작하므로 연결 실패 시 원래 사이트 자료가 대신 노출되지 않습니다. 기존 운영 사이트의 자료와 설정은 유지합니다.

유지보수: 학생 코드, 서버 코드 또는 안내서를 바꾸면 `python3 scripts/build-teacher-kit.py`로 ZIP과 안내 페이지의 다운로드 파일을 다시 생성하고 함께 커밋하세요. `npm test`는 ZIP이 최신 원본 코드와 일치하는지, 운영 API·자료가 들어가지 않았는지 검사합니다. 배포 ZIP에는 개발용 테스트·빌드 도구를 넣지 않으므로 받는 선생님은 Python/Node 설치가 필요 없습니다. 현재 저장소 개발 테스트에는 Python 3가 추가로 필요합니다.

폐쇄형 자료 목록에서 자료를 찾고, 출처·관련성·인과관계를 학생이 직접 판단하는 검색/피드입니다. 정답, 신뢰도, 교사용 분류를 화면에 표시하지 않습니다. 계정, 검색 기록, 분석 추적, 저장 기능은 없습니다.

## 현재 운영 자료 (2026-10-27)

articles 시트와 공개 fallback 스냅샷은 전기 단원 설명문 130건으로 전환했습니다.

- 전자석의 활용 30건: 기중기, 전기종, 전자밸브, 스피커, 생활용품 전동기 등
- 전기의 효율적 사용 50건: 조명, 냉난방, 주방, 세탁, 디지털 기기, 학교생활 등
- 전기의 안전한 사용 50건: 감전·화재 예방, 플러그와 전선, 충전·전지, 물 주변과 야외, 비상시 행동 등

각 글은 6학년이 읽을 수 있는 세 문단(본문 327~389자)의 새 설명문이며 실제 보도기사가 아닙니다. 출처는 ‘NAMSAN 수업용 설명문’, 날짜는 작성일입니다. 공공기관·안전기관·제조사의 원리와 지침을 확인한 참고 URL은 source 셀 메모에 기록했습니다. 학생에게 수리·위험한 시험을 지시하지 않고 성인과 전문가에게 도움을 요청하도록 설명했습니다. 제품마다 구조와 사용법이 다른 경우 이를 밝혔습니다.

각 자료에 주제·생활용품·유사 표현의 tags와 keywords를 넣었습니다. 기존 250건은 같은 시트의 backup_before_electricity_20261027 탭에 보관했습니다. API는 articles만 읽으며 교사용 필드와 셀 메모는 내보내지 않습니다. 운영 시트 수정은 180초 캐시가 만료되면 사이트에 자동 반영됩니다. 공개 fallback은 이번 130건의 배포 시점 스냅샷이므로 이후 시트 수정과 자동 동기화되지는 않습니다.

## 이전 단원 기록 (2026-10-14)

현재 articles 시트와 공개 fallback 스냅샷은 총 250건입니다. 기존 200건을 유지하고 미래 사회의 문제를 과학으로 해결하는 사례 50건(career-201~250)을 추가했습니다. 신규 글은 한국화학연구원 16건, NASA Spinoff 28건, MIT News 5건, WIPO 1건의 실제 발표 자료를 바탕으로 초등학생용으로 재구성했습니다. 발표일은 2025-12-30~2026-10-07이며, 과거 사례를 소개하는 기사에서는 사건 시점과 발표일을 구분했습니다.

각 글은 세 문단으로 문제·과학적 방법·확인된 성과와 적용 범위를 설명합니다. 원문 URL과 발표일은 비공개 관리 시트의 source 셀 메모에 기록했습니다. 실험·시범 운영·상용 활용을 본문에서 구분하며 자동 신뢰도 판정은 하지 않습니다. 환경오염, 물부족, 식량문제, 노인건강 등 학생의 표현을 tags와 keywords에 넣었습니다. 공개 fallback은 교사용 필드를 포함하지 않습니다.

아래 초기 구현 기록의 20건·76건은 당시 기준이며, 현재 운영 자료 수가 아닙니다. 현재 테스트는 `npm test`를 기준으로 확인하세요.

## 초기 구현 기록

- HTML/CSS/Vanilla JavaScript 프론트엔드와 예시 자료 20개 구현.
- 읽기 전용 Apps Script 전체 코드, 시트 생성 함수, 공개 필드 허용 목록, 180초 캐시, GitHub Pages 워크플로 제공.
- Google Sheet 생성 완료: 교사 계정의 ChatGPT 폴더 안 교사용 자료 관리 시트. articles 시트에 76개 자료, 선택 목록, 공개 여부 체크박스가 있습니다. 원본 시트는 학생에게 공유하지 마세요.
- GitHub 저장소와 Pages 배포 완료: https://0361kr-del.github.io/eco-search/
- 2026-09-28: Apps Script 웹 앱을 소유자 권한 / 모든 사용자 접근으로 배포하고 `public/config.js`에 실제 `/exec` URL을 연결했습니다. 익명 HTTP 요청으로 76개 자료와 교사용 필드 제외를 확인했습니다.
- 자료 추가·수정에는 재인증이나 재배포가 필요하지 않습니다. Sheet 저장 후 최대 약 180초 캐시가 만료되면 사이트 새로고침으로 반영됩니다. Apps Script 코드·권한 변경이나 Google 보안 정책에 따라 별도 인증이 필요할 수 있습니다.
- Apps Script는 `@OnlyCurrentDoc`를 사용하여 연결된 문서 범위로 권한을 제한합니다.
- 첨부되지 않은 미래엔 수업지도안/PPT 원본은 열람하지 않았습니다. 사용자 명세를 바탕으로 제작했습니다.
- `npm test` 8개 통과. 배포된 사이트의 기본 검색·피드·상세 흐름을 브라우저에서 확인했습니다. 실제 모바일/태블릿 기기는 아직 미검증입니다. 자세한 내용은 `TEST-RESULTS.md`를 확인하세요.

## 로컬 실행

Node나 번들러 없이 실행할 수 있습니다. ES module과 fetch를 사용하므로 HTML 파일을 더블클릭하는 `file://` 방식 대신 HTTP 서버를 사용합니다.

```bash
cd eco-search
python3 -m http.server 4173 --directory public
```

브라우저에서 `http://localhost:4173`을 엽니다. 별도 빌드는 없습니다. Node 22 이상은 자동 테스트 실행에만 사용합니다.

## 저장소 구조

```text
eco-search/
  public/                    # 이 폴더만 Pages에 배포
    index.html
    style.css
    app.js
    config.js
    js/
      api.js                 # API/timeout/fallback/응답 검증
      search.js              # 검색 점수 및 가중 무작위 순서
      feed.js                # 안전한 카드 DOM
      modal.js               # dialog, 뒤로, Esc, 포커스 복원
    data/fallback.json       # 교사용 분류가 없는 공개 스냅샷 250개
    assets/ice.svg           # 수업용 가상 관측 그래프
    assets/ph.svg
  apps-script/Code.gs
  tests/core.test.js
  tests/browser.mjs
  .github/workflows/pages.yml
  .gitignore
  package.json
  README.md
  TEST-RESULTS.md
```

별도 `teacher-private.zip` 안의 `articles.csv`에는 동일한 예시와 교사용 분류가 있습니다. **이 파일과 압축 파일은 GitHub 저장소에 넣지 마세요.** 공개 저장소에 넣으면 Pages에 배포하지 않아도 원문을 읽을 수 있습니다. `.gitignore`는 보조 장치이며, 이미 커밋한 파일을 비공개로 만들지 않습니다. CSV는 교사 개인 Google Sheet에만 가져옵니다.

## 사용 흐름

검색창에서 Enter 또는 검색 버튼을 누르면 검색합니다. 입력 중에는 요청하지 않습니다. 검색어를 모두 지우면 중앙의 NAMSAN 로고와 검색창 화면으로 돌아갑니다. 첫 화면에는 자료 목록이 없습니다. 처음에는 12개, 하단 근처에서 다음 10개를 렌더링합니다. IntersectionObserver를 지원하지 않으면 ‘자료 더 보기’로 계속 볼 수 있습니다. 검색 결과에는 같은 id가 중복 표시되지 않습니다. 검색·복귀 때 같은 자료를 다시 볼 수는 있습니다.

카드를 누르면 본문, 출처, 작성자, 날짜, 자료 유형, 이미지와 태그를 표시합니다. 미기입 메타데이터는 ‘표시 없음’으로 드러납니다. 뒤로 버튼·브라우저 뒤로·Esc로 닫고 카드 포커스와 스크롤 위치로 돌아갑니다. 본문은 HTML/Markdown을 해석하지 않는 일반 텍스트입니다. 줄바꿈은 보존합니다.

검색은 제목·요약·태그·검색 키워드를 사용합니다. 본문 전체와 교사용 분류는 검색 순위에 사용하지 않습니다. 제목 정확 일치를 먼저, 여러 검색어를 모두 포함한 자료를 그다음으로 정렬합니다. 제목 8점, 태그 정확 일치 7점(부분 일치 4점), keywords 정확 일치 5점(부분 일치 3점), 요약 2점이며, 동의어 점수는 직접 일치의 80%입니다. 모든 검색어가 맞으면 15점을 더하고, 동점이면 원래 자료 순서를 유지합니다. 점수는 자료의 신뢰도나 정답 여부를 뜻하지 않습니다.

NFKC 정규화, 대소문자·띄어쓰기 차이, 해시태그 기호를 처리합니다. `환경오염`, `환경 오염`, `#환경오염`을 같은 주제로 찾고, AI/인공지능·MLB/메이저리그 등 대응 표현도 지원합니다. 형태소 분석이나 자동 오타 수정 기능은 아닙니다.

교사는 `tags`(상세 화면 해시태그)와 `keywords`(추가 검색어)에 쉼표로 표현을 추가하면 됩니다. 예를 들어 대기오염 자료에는 `환경오염,공기오염,대기오염,환경문제`를 넣을 수 있습니다. 더 넓은 주제는 실제 내용과 관계있을 때만 추가하세요. 키워드 편집은 API 캐시 만료 후 사이트 새로고침으로 반영되며 재배포가 필요하지 않습니다.

## Google Sheets 열 구조

시트 이름은 정확히 `articles`, 첫 행은 다음 헤더를 사용합니다. 열 순서는 자유롭지만 헤더 이름은 유지하세요. 알 수 없는 추가 열은 API 허용 목록에 없으므로 공개하지 않습니다.

| 열 | 입력 |
|---|---|
| id | 중복 없는 문자열 ID, 예: `a001` |
| title | 제목, 필수 |
| summary | 피드 설명 |
| content | 전체 본문, 셀 내부 줄바꿈 지원 |
| source | 출처명, 없으면 공백 |
| author | 작성자, 없으면 공백 |
| date | 날짜 또는 YYYY-MM-DD 문자열 |
| image | HTTPS 이미지 URL 또는 사이트 기준 상대 경로, 없으면 공백 |
| type | article / sns / chart / report / blog / photo / card |
| tags | 쉼표로 구분 |
| keywords | 쉼표로 구분 |
| published | 체크박스 TRUE/FALSE 또는 같은 문자열 |
| feedWeight | 양수, 기본 1 |
| teacherCategory | valid / relevance_trap / source_trap / causality_trap / insufficient / dummy |
| difficulty | easy / normal / hard |

`published`가 TRUE인 행만 반환합니다. 숫자 1, 공백, FALSE는 공개하지 않습니다. 공개 대상의 id/title 누락, 중복 id, 헤더 누락·중복은 오류로 처리합니다. 일부 행을 조용히 누락하는 대신 수정하도록 합니다.

### 시트 만들기

1. 교사의 Google Drive에서 새 스프레드시트를 만듭니다. 학생에게 원본 시트나 편집 권한을 공유하지 않습니다.
2. 확장 프로그램 → Apps Script를 엽니다. 바인딩된 스크립트로 만들어야 `getActiveSpreadsheet()`가 동작합니다.
3. `apps-script/Code.gs` 전체를 붙여 넣고 저장합니다. 프로젝트 시간대를 `Asia/Seoul`로 설정합니다.
4. 빈 시트로 시작하려면 편집기에서 `setupArticlesSheet()`를 한 번 실행하고 권한을 허용합니다. 기존 `articles` 내용은 덮어쓰지 않습니다.
5. 예시로 시작하려면 별도 교사용 `articles.csv`를 파일 → 가져오기 → 새 시트 삽입으로 가져와 시트 이름을 `articles`로 지정합니다. 같은 이름의 빈 시트가 있다면 먼저 정리합니다. UTF-8이며 본문 줄바꿈이 셀 안에 유지되어야 합니다. 이 경우 setup 함수 실행은 필요 없습니다.
6. 실제 수업 자료를 검토·수정한 뒤 `published`를 TRUE로 설정합니다. 예시는 실제 관측 보고서가 아닙니다.

## Apps Script 배포

프로젝트 설정의 시간대는 Sheet와 같은 `Asia/Seoul`로 설정하세요. 날짜가 하루 어긋나는 것을 방지합니다. 현재 운영 배포는 이 설정을 적용했습니다.

1. 편집기에서 배포 → 새 배포 → 유형 ‘웹 앱’을 선택합니다.
2. 실행 사용자: **나(교사)**, 액세스: **모든 사용자**(학생의 로그인 없이 접근 가능한 설정)를 선택합니다. 학교 조직 정책이 익명 액세스를 금지하면 관리자의 허용이 필요합니다.
3. 권한 승인 후 배포된 `/exec` URL을 복사합니다. `/dev` 테스트 URL은 학생용이 아닙니다.
4. 로그아웃/시크릿 창에서 `/exec`를 열어 `updatedAt`과 `items`가 있는 JSON인지 확인합니다. Google 로그인 HTML이면 익명 접근 설정을 수정합니다.
5. `public/config.js`의 `API_URL` 한 곳에 `/exec` URL을 입력합니다. API URL은 공개 주소이며 비밀 키가 아닙니다. 원본 Sheet URL·ID나 토큰은 프론트에 넣지 않습니다.
6. config 변경을 GitHub에 한 번 반영합니다. 이후 **행 추가·수정은 코드 수정이나 Pages 재배포 없이**, 캐시 만료 후 다음 로딩/새로고침에 반영됩니다. 이미 열린 탭은 자동 폴링하지 않습니다.
7. Apps Script 코드 자체를 수정했다면 배포 관리 → 수정 → 새 버전으로 같은 배포를 업데이트합니다. 기존 `/exec` 주소를 유지할 수 있습니다.

API는 `doGet()`만 있으며 쓰기 엔드포인트가 없습니다. 요청 파라미터로 원본 행이나 교사용 필드를 조회할 수 없습니다. 응답 생성 단계에서 공개 필드만 새 객체에 복사합니다. 프론트의 추가 필드 제거는 방어적 처리일 뿐, 정보 비공개의 책임은 서버에 있습니다.

ContentService는 Google의 콘텐츠 주소로 리디렉션합니다. fetch는 기본 CORS 모드와 `redirect: 'follow'`, `credentials: 'omit'`로 사용합니다. `no-cors`를 쓰면 읽을 수 없는 응답이 되어 해결되지 않습니다. 실제 학교 네트워크에서 Apps Script와 리디렉션 대상 접근, 익명 JSON 읽기를 확인해야 합니다. JSONP는 사용하지 않습니다.

캐시는 ScriptCache에 180초 보관합니다. 30명 동시 최초 요청은 ScriptLock으로 직렬화하고 잠금을 얻은 뒤 캐시를 재확인합니다. 한글 본문으로 값당 크기 제한을 넘지 않도록 20,000 UTF-16 코드 단위씩 청크를 저장하고 마지막에 목록을 게시합니다. 청크가 사라지면 다시 Sheet를 읽습니다. 캐시는 조기 제거될 수 있고 저장 실패 시에도 읽은 JSON을 반환합니다. 편집기에서 `clearArticleCache()`를 실행하면 다음 요청에서 다시 읽습니다. 이미 학생에게 전송된 자료는 회수할 수 없습니다.

오류 시 Apps Script는 `{"error":"DATA_UNAVAILABLE"}`를 반환합니다. ContentService의 HTTP 상태가 200이어도 프론트가 이 필드를 오류로 처리합니다. 내부 오류·시트 주소는 응답에 포함하지 않습니다.

## GitHub Pages 배포

1. GitHub에 `eco-search` 저장소를 만들고 이 프로젝트 폴더 내용만 업로드합니다. 교사용 ZIP/CSV는 업로드하지 않습니다.
2. 기본 브랜치를 `main`으로 사용하거나 `.github/workflows/pages.yml`의 브랜치를 실제 이름에 맞춥니다.
3. Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
4. main으로 push하거나 Actions에서 `Deploy student site`를 수동 실행합니다.
5. 워크플로는 Node 테스트를 실행하고 **public 폴더만** 아티팩트에 담아 배포합니다. 성공 후 Pages 설정 또는 Actions의 배포 URL을 엽니다.
6. `https://계정.github.io/eco-search/`처럼 하위 경로에서도 상대 경로로 JS·JSON·이미지를 읽습니다.

브랜치 루트 전체를 게시하지 마세요. Apps Script 원본, 테스트, README와 교사용 설명은 학생용 배포에 포함할 필요가 없습니다. 저장소 자체를 공개하면 이 문서·서버 코드는 공개됩니다. 실제 교사용 분류 데이터는 별도 비공개 Sheet에만 둡니다. Pages는 인터넷 전체를 검색하지 않는 폐쇄형 데이터 검색이지만, URL 접근 자체를 제한하는 사설 사이트는 아닙니다.

## 설정·장애 대응

`config.js`에서 API_URL, FALLBACK_URL, ALLOW_FALLBACK, 초기/추가 개수, 최소 검색어 길이, 요청 제한시간을 바꿉니다. CACHE_VERSION은 향후 클라이언트 캐시용 예약 값이며 현재 브라우저 데이터 캐시는 없습니다. 서버 캐시를 갱신하려면 Code.gs의 CACHE_KEY를 바꾸거나 clearArticleCache를 사용하세요.

- 현재 요청 제한은 30초입니다. 실패하면 준비된 fallback을 읽습니다.
- fallback 전환 시 화면에 실시간 자료 실패 사실과 다시 시도를 표시합니다.
- API와 fallback이 모두 실패하면 오류와 다시 시도 버튼을 표시합니다.
- 최신 자료만 허용하려면 ALLOW_FALLBACK을 false로 바꿉니다.
- API가 정상적으로 빈 목록을 반환하면 예시로 대체하지 않고 빈 화면 안내를 표시합니다.
- fallback은 별도의 공개 스냅샷입니다. Sheet 수정·미게시 전환이 fallback에 자동 반영되지는 않습니다. 운영용 스냅샷을 유지하거나 fallback을 끄세요.
- 브라우저나 HTML에 개인정보, 키, 로그를 저장하지 않습니다. Google/GitHub 제공자의 통상 접근 로그는 이 프로젝트가 제어하지 않습니다.
- image에는 공개 접근 가능한 800px 이하 WebP/JPEG를 권장합니다. 외부 이미지는 해당 서버에 접속합니다. 참조자 정보는 보내지 않습니다. 예시 그래프는 자체 제작 SVG로 외부 호출이 없습니다.

## 자료의 성격

20개는 교사가 검토할 수업용 예시입니다. 출처명·날짜·작성자는 실제 기관 발행 기록이 아닌 예시 메타데이터입니다. 가상 관측 그래프에는 가상 값임을 직접 적었습니다. 분류 비율은 요구사항대로 8/4/3/2/2/1이며 개별 대응표는 별도 교사용 CSV에만 있습니다. 학생에게 어느 자료가 정답인지 알려주는 배지·색상·판정은 없습니다. 모든 타입에 같은 카드 구조를 사용합니다.

개념 서술을 검토할 때 참고한 공식 자료:
- [NOAA: Ocean acidification](https://noaa.gov/education/resource-collections/ocean-coasts-education-resources/ocean-acidification)
- [NOAA: Biological response](https://oceanacidification.noaa.gov/ocean-acidification-research/ocean-acidification-biological-response/)
- [BAS: Emperor penguin breeding failure](https://www.bas.ac.uk/news/loss-of-sea-ice-causes-catastrophic-breeding-failure-for-emperor-penguins/)
- [IPCC AR6: Polar regions](https://www.ipcc.ch/report/ar6/wg2/chapter/ccp6/)

이 링크들은 개념 검토용이며 예시 날짜·가상 수치를 뒷받침하는 출처가 아닙니다. 실제 수업 운영에서는 피해 현황을 비교할 수 있는 장소·기간·수치가 포함된 실제 자료로 교사가 보완하세요.

## 테스트 방법

```bash
cd eco-search
npm test
```

외부 패키지 없이 검색, 250개 자료, 공개 스키마, 가중 추천, API mock, 미게시 제외, 교사용 추가 열 제거, 캐시 히트·일부 손실, 오류 비노출, timeout/fallback을 검증합니다. Apps Script 테스트는 Node VM mock이므로 Google 서비스에서의 실제 인증·할당량·CORS를 검증하지는 않습니다.

브라우저 통합 테스트는 서버를 실행한 상태에서:

```bash
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node tests/browser.mjs
```

390px/768px/1440px 화면, 최초 12개, 산호 검색 5개, 상세/Esc/브라우저 뒤로/포커스, 검색 삭제, 무한 스크롤, 200% 글자 설정, 로딩/오류/재시도, API 실패·회복, HTML 삽입 방지와 JS 오류를 검사합니다. 예시 자료를 변경하면 개수 기대값도 조정하세요.

실제 배포 후 반드시 확인할 항목:

- 실제 iPad/Android/iPhone에서 검색 키보드와 스크롤, 상세 닫기, 확대 읽기.
- 개발자 도구 Network에서 `/exec` 원문 응답에 `teacherCategory`, `difficulty`와 임의 교사용 열이 없는지 확인.
- 비공개 시험 행에 식별 가능한 문자열을 넣고 published FALSE로 저장 → 캐시 초기화 → 응답 전체 검색에서 없음을 확인.
- Sheet 새 행 추가 후 3분 이상 경과 → 페이지 새로고침 → 코드 배포 없이 나타나는지 확인.
- published FALSE로 바꾼 행도 캐시 경과 후 live 응답에서 사라지는지 확인. fallback과 이미 열린 탭은 별도입니다.
- API URL 오류와 네트워크 오프라인 상태에서 fallback 안내 또는 전체 오류가 나오는지 확인.
- 20~30대 실제 교실 네트워크에서 동시 접속. API 응답·리디렉션, Google 정책, 계정 할당량은 현장에서 확인.
- 그래프·이미지 실패 시 제목/본문으로 탐색 가능한지 확인.
- DevTools Console에 치명적 JS 오류가 없는지 확인.

## 후속 TODO (MVP 제외)

- 증거함과 익명 모둠 코드 기반 기록: 별도 요구·개인정보 검토 후 설계.
- 검색/선택 기록 및 교사용 분석, 자료 제보 승인.
- 교사 검증 자료와 출처 원문 보강, 사진·기관 그래프의 재사용 권한 검토.
- 필요할 때만 자동 갱신, 대용량 API pagination, 관리 도구 추가.

## 배포 참고 문서

- [GitHub Pages: custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Apps Script: Web apps](https://developers.google.com/apps-script/guides/web)
- [Apps Script: Content Service](https://developers.google.com/apps-script/guides/content)
- [Apps Script: CacheService](https://developers.google.com/apps-script/reference/cache/cache-service)

## Apps Script 전체 코드

아래와 `apps-script/Code.gs`는 동일합니다.

```javascript
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

```

