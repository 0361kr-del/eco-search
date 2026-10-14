import importlib.util
import io
import json
from pathlib import Path
import re
import zipfile

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('kit', root/'scripts/build-teacher-kit.py')
kit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(kit)
data = (root/'public/teachers/namsan-starter.zip').read_bytes()
with zipfile.ZipFile(io.BytesIO(data)) as actual, zipfile.ZipFile(io.BytesIO(kit.build())) as expected:
    assert actual.namelist() == expected.namelist(), 'Rebuild the teacher kit before publishing'
    assert all(actual.read(name) == expected.read(name) for name in actual.namelist()), 'Rebuild the teacher kit before publishing'
with zipfile.ZipFile(io.BytesIO(data)) as z:
    names = z.namelist()
    assert all(n.startswith('namsan-starter/') and '..' not in n for n in names)
    prefix = 'namsan-starter/'
    assert json.loads(z.read(prefix+'docs/data/fallback.json'))['items'] == []
    config = z.read(prefix+'docs/config.js').decode()
    assert "API_URL: ''" in config and 'ALLOW_FALLBACK: false' in config
    original = re.search(r"API_URL: '([^']+)'", (root/'public/config.js').read_text()).group(1)
    for name in names:
        content = z.read(name).decode()
        assert original not in content, name
        assert 'career-001' not in content, name
        assert '18cHMdeGCs7psKAH' not in content, name
    for name in kit.FILES:
        assert z.read(prefix+'docs/'+name) == (root/'public'/name).read_bytes()
    assert z.read(prefix+'apps-script/Code.gs') == (root/'apps-script/Code.gs').read_bytes()
assert (root/'public/teachers/Code.gs.txt').read_bytes() == (root/'apps-script/Code.gs').read_bytes()
assert (root/'public/teachers/README.md').read_bytes() == (root/'docs/TEACHER-GUIDE.md').read_bytes()
print('isolated kit verified')
