// Optional: npm install --no-save --package-lock=false playwright
// npx playwright install chromium; serve public/ on port 4173; node tests/browser.mjs
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const base='http://127.0.0.1:4173';
const errors=[];
const page=await browser.newPage({viewport:{width:390,height:844}});
page.on('pageerror',error=>errors.push(error.message));
await page.goto(base);await page.locator('.card').first().waitFor();
assert.equal(await page.locator('.card').count(),12);
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.locator('#query').fill('산호');await page.locator('#query').press('Enter');
assert.equal(await page.locator('.card').count(),5);
await page.getByRole('button',{name:'산호는 곧 모두 사라진다! 전체 읽기'}).click();
assert.ok(await page.locator('#detail').evaluate(el=>el.open));
assert.ok((await page.locator('#detail-body').innerText()).includes('표시 없음'));
await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#detail').open);
assert.ok(await page.evaluate(()=>document.activeElement.classList.contains('card-link')));
await page.locator('#clear').click();assert.equal(await page.locator('.card').count(),12);
await page.locator('#more').click();assert.equal(await page.locator('.card').count(),20);
await page.locator('#query').fill('XYZ없는검색어');await page.locator('#query').press('Enter');assert.ok(await page.locator('#empty').isVisible());
await page.locator('#query').fill('');assert.equal(await page.locator('.card').count(),12);
await page.locator('.card-link').first().click();await page.goBack();await page.waitForFunction(()=>!document.querySelector('#detail').open);
for(const width of [768,1440]){await page.setViewportSize({width,height:1000});await page.goto(base);await page.locator('.card').first().waitFor();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
await page.setViewportSize({width:390,height:844});await page.goto(base);await page.locator('.card').first().waitFor();
await page.evaluate(()=>document.documentElement.style.fontSize='32px');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
// Infinite scrolling without the fallback button.
await page.goto(base);await page.locator('.card').first().waitFor();await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await page.waitForFunction(()=>document.querySelectorAll('.card').length===20);
// Delayed network skeleton and total failure/retry.
await page.route('**/data/fallback.json',async route=>{await new Promise(resolve=>setTimeout(resolve,350));await route.abort();});
await page.goto(base);assert.ok(await page.locator('.skeleton').count()>0);await page.locator('#error').waitFor();await page.unroute('**/data/fallback.json');await page.locator('#retry').click();await page.locator('.card').first().waitFor();
// A failing configured API shows fallback notice, then retry can recover.
await page.route('**/config.js',route=>route.fulfill({contentType:'text/javascript',body:"export const CONFIG={API_URL:'/live-api',FALLBACK_URL:'./data/fallback.json',ALLOW_FALLBACK:true,INITIAL_BATCH_SIZE:12,LOAD_MORE_SIZE:10,MIN_QUERY_LENGTH:1,REQUEST_TIMEOUT_MS:200};"}));
await page.route('**/live-api',route=>route.fulfill({contentType:'application/json',body:'{"error":"DATA_UNAVAILABLE"}'}));await page.goto(base);await page.locator('.card').first().waitFor();assert.ok((await page.locator('#notice').innerText()).includes('실시간'));
await page.unroute('**/live-api');await page.route('**/live-api',route=>route.fulfill({contentType:'application/json',body:'{"items":[]}'}));await page.locator('#notice button').click();await page.locator('#empty').waitFor();assert.ok(await page.locator('#notice').isHidden());
// Treat injected strings as text, reject javascript image URLs.
await page.unroute('**/live-api');await page.route('**/live-api',route=>route.fulfill({contentType:'application/json',body:JSON.stringify({items:[{id:'safe',title:'<img src=x onerror=alert(1)>',content:'<script>alert(1)</script>',summary:'text',image:'javascript:alert(1)',tags:[],keywords:[]}]})}));
await page.reload();await page.locator('.card').first().waitFor();assert.equal(await page.locator('.card img').count(),0);await page.locator('.card-link').click();assert.equal(await page.locator('#detail script').count(),0);
await page.unroute('**/config.js');await page.unroute('**/live-api');
await page.goto(base);await page.locator('.card').first().waitFor();await page.locator('#query').fill('바닷물에 녹은');await page.locator('#query').press('Enter');
await page.screenshot({path:'preview-mobile.png',fullPage:true});await page.setViewportSize({width:1440,height:1100});await page.screenshot({path:'preview-desktop.png'});
assert.deepEqual(errors,[]);console.log('PASS: mobile/tablet/desktop, initial batch, search, clear, modal/Esc/back/focus, infinite scroll, 200% text, skeleton, error/retry, API fallback/recovery, XSS, no JS page errors');
await browser.close();
