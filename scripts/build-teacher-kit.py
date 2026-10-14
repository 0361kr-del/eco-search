"""Build a deterministic, owner-independent classroom distribution. No dependencies."""
from pathlib import Path
import io
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUT = PUBLIC / 'teachers'
FILES = ['index.html', 'style.css', 'app.js', 'js/api.js', 'js/feed.js', 'js/modal.js', 'js/search.js']
CONFIG = """export const CONFIG = Object.freeze({
  API_URL: '',
  FALLBACK_URL: './data/fallback.json',
  ALLOW_FALLBACK: false,
  INITIAL_BATCH_SIZE: 12,
  LOAD_MORE_SIZE: 10,
  MIN_QUERY_LENGTH: 1,
  REQUEST_TIMEOUT_MS: 30000,
  CACHE_VERSION: '1',
});
"""

def build():
    files = {'docs/' + name: (PUBLIC / name).read_bytes() for name in FILES}
    files['docs/config.js'] = CONFIG.encode()
    files['docs/data/fallback.json'] = b'{"updatedAt":null,"items":[]}\n'
    files['docs/.nojekyll'] = b''
    files['README.md'] = (ROOT / 'docs/TEACHER-GUIDE.md').read_bytes()
    files['apps-script/Code.gs'] = (ROOT / 'apps-script/Code.gs').read_bytes()
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in sorted(files.items()):
            info = zipfile.ZipInfo('namsan-starter/' + name, date_time=(2026, 10, 14, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, data)
    return buffer.getvalue()

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'namsan-starter.zip').write_bytes(build())
    (OUT / 'README.md').write_bytes((ROOT / 'docs/TEACHER-GUIDE.md').read_bytes())
    (OUT / 'Code.gs.txt').write_bytes((ROOT / 'apps-script/Code.gs').read_bytes())
    print('Teacher kit rebuilt without operating API or article data.')
