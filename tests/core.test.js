import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {searchItems,weightedOrder} from '../public/js/search.js';
import {sanitize,loadArticles} from '../public/js/api.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/data/fallback.json',import.meta.url)));
test('public dataset: 150 unique articles and only allowed fields',()=>{assert.equal(data.items.length,150);assert.equal(new Set(data.items.map(x=>x.id)).size,150);for(const item of data.items)assert.deepEqual(Object.keys(item).sort(),['id','title','summary','content','source','author','date','image','type','tags','keywords','feedWeight'].sort());});
test('search normalization, zero match, exact title and multiple-term ranking',()=>{
 assert.deepEqual(searchItems(data.items,'  스마트팜  '),searchItems(data.items,'스마트팜'));
 assert.equal(searchItems(data.items,'없는검색어123').length,0);
 assert.equal(searchItems(data.items,data.items[0].title)[0].id,data.items[0].id);
 assert.ok(searchItems(data.items,'스마트팜').length>0);
 assert.ok(searchItems(data.items,'KBO').length>0);
 assert.ok(searchItems(data.items,'EPL').length>0);
 assert.ok(searchItems(data.items,'인공지능').length>0);
 assert.ok(data.items.every(item=>item.content.length>=240));
 const base={summary:'',tags:[],keywords:[]};
 assert.deepEqual(searchItems([{...base,id:'b',title:'산호'},{...base,id:'a',title:'산호 바다'}],'산호 바다').map(x=>x.id),['a','b']);
 assert.equal(searchItems([{...base,id:'c',title:'기록',content:'산호'}],'산호').length,0);
});
test('weighted sampling has no repeats and favors higher weights',()=>{
 let seed=13;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 assert.equal(new Set(weightedOrder(data.items,random).map(x=>x.id)).size,150);
 let wins=0;for(let i=0;i<2000;i++)if(weightedOrder([{id:'high',feedWeight:10},{id:'low',feedWeight:1}],random)[0].id==='high')wins++;
 assert.ok(wins>1700&&wins<1900);
});
test('payload validation rejects invalid IDs and excludes extra properties',()=>{
 assert.throws(()=>sanitize({error:'NO',items:[]}));assert.throws(()=>sanitize({items:[data.items[0],data.items[0]]}));
 assert.equal('secret' in sanitize({items:[{...data.items[0],secret:'private'}]})[0],false);
});
function gas(rows,fail=false){
 const map=new Map();let reads=0;const cache={get:k=>map.get(k)||null,getAll:ks=>Object.fromEntries(ks.filter(k=>map.has(k)).map(k=>[k,map.get(k)])),put:(k,v)=>map.set(k,v),putAll:o=>Object.entries(o).forEach(([k,v])=>map.set(k,v)),remove:k=>map.delete(k)};
 const ctx={console,CacheService:{getScriptCache:()=>cache},LockService:{getScriptLock:()=>({waitLock(){},hasLock:()=>true,releaseLock(){}})},Session:{getScriptTimeZone:()=> 'Asia/Seoul'},Utilities:{getUuid:()=> 'test',formatDate:()=> '2025-01-01'},SpreadsheetApp:{getActiveSpreadsheet:()=>({getSheetByName:()=>({getDataRange:()=>({getValues:()=>{reads++;if(fail)throw Error('secret spreadsheet id');return rows.map(r=>[...r]);}})})})},ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({text,setMimeType(){return this;}})}};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync(new URL('../apps-script/Code.gs',import.meta.url),'utf8'),ctx);return {ctx,map,reads:()=>reads};
}
const headers=['id','title','summary','content','source','author','date','image','type','tags','keywords','published','feedWeight','teacherCategory','difficulty','privateNotes'];
const row=(id,published)=>headers.map(k=>({id,title:'Title',published,tags:'산호, 바다',keywords:'CO2',teacherCategory:'SECRET_CATEGORY',difficulty:'SECRET_DIFFICULTY',privateNotes:'SECRET_NOTE',feedWeight:8,content:'본문'.repeat(14000)})[k]??'');
test('server allowlist, unpublished rows, cached requests, chunk eviction',()=>{
 const env=gas([headers,row('1',true),row('2','FALSE'),row('3','TRUE')]);
 const result=env.ctx.doGet().text;assert.equal(JSON.parse(result).items.length,2);assert.ok(!result.includes('SECRET'));assert.ok(!result.includes('teacherCategory'));assert.ok(!result.includes('difficulty'));
 assert.deepEqual(JSON.parse(result).items[0].tags,['산호','바다']);assert.equal(env.ctx.doGet().text,result);assert.equal(env.reads(),1);
 const part=[...env.map.keys()].find(k=>k.includes(':test:'));env.map.delete(part);env.ctx.doGet();assert.equal(env.reads(),2);
 env.ctx.clearArticleCache();env.ctx.doGet();assert.equal(env.reads(),3);
});
test('server errors are generic and do not leak private details',()=>{const env=gas([headers,row('1',true)],true);assert.deepEqual(JSON.parse(env.ctx.doGet().text),{error:'DATA_UNAVAILABLE'});});
test('duplicate ids and missing headers fail closed',()=>{
 for(const rows of [[headers,row('1',true),row('1',true)],[['id'],['1']]])assert.deepEqual(JSON.parse(gas(rows).ctx.doGet().text),{error:'DATA_UNAVAILABLE'});
});
test('client fallback, strict errors and timeout',async()=>{
 const original=globalThis.fetch;const config={API_URL:'https://api.example',FALLBACK_URL:'fallback',ALLOW_FALLBACK:true,REQUEST_TIMEOUT_MS:10};
 try{
 globalThis.fetch=async url=>{if(url===config.API_URL)throw Error('offline');return {ok:true,json:async()=>data};};
 assert.equal((await loadArticles(config)).mode,'fallback');await assert.rejects(()=>loadArticles({...config,ALLOW_FALLBACK:false}));
 globalThis.fetch=async()=>({ok:true,json:async()=>({items:[]})});assert.equal((await loadArticles(config)).mode,'live');
 globalThis.fetch=async(url,{signal})=>new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(Error('timeout'))));await assert.rejects(()=>loadArticles({...config,ALLOW_FALLBACK:false}));
 }finally{globalThis.fetch=original;}
});

test('student vocabulary, spacing, hashtags and aliases retrieve relevant articles',()=>{
 const ids=q=>searchItems(data.items,q).map(x=>x.id);
 assert.ok(ids('환경오염').length>=10);
 assert.deepEqual(ids('환경 오염'),ids('환경오염'));
 assert.deepEqual(ids('#환경오염'),ids('환경오염'));
 assert.ok(!searchItems(data.items,'환경오염').some(x=>x.tags.includes('스포츠')));
 assert.deepEqual(new Set(ids('AI')),new Set(ids('인공지능')));
 assert.deepEqual(new Set(ids('스마트 농장')),new Set(ids('스마트팜')));
 assert.ok(searchItems(data.items,'환경오염 직업')[0].title.includes('직업'));
 assert.deepEqual(searchItems([{id:'x',title:'내용',tags:['환경 오염'],keywords:[]}],'환경오염').map(x=>x.id),['x']);
 assert.equal(searchItems(data.items,'없는검색어123').length,0);
});
