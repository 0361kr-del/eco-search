import {createConfig} from './config-builder.js';
const form = document.querySelector('#settings');
const preview = document.querySelector('#preview');
form.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#result');
  try {
    const content = createConfig(document.querySelector('#api-url').value);
    preview.value = content;
    preview.hidden = false;
    const url = URL.createObjectURL(new Blob([content], {type:'text/javascript;charset=utf-8'}));
    const a = document.createElement('a');
    a.href = url; a.download = 'config.js'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = '설정 파일을 만들었습니다. 내려받은 config.js로 압축을 푼 폴더의 docs/config.js를 교체하세요. 다운로드가 차단되면 아래 내용을 복사해 붙여 넣으세요. 실제 API 연결 확인은 배포 후 검색으로 진행합니다.';
  } catch(error) {
    preview.value = ''; preview.hidden = true; status.textContent = error.message;
  }
});
