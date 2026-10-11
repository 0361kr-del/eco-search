import {CONFIG} from './config.js';
import {loadArticles} from './js/api.js';
import {searchItems,normalize} from './js/search.js';
import {card,el} from './js/feed.js';
import {createDetail} from './js/modal.js';
const $=selector=>document.querySelector(selector),open=createDetail();
let articles=[],results=[],shown=0,ready=false,loading=false,activeQuery='';
function setMode(){
  const home=!activeQuery;
  document.body.classList.toggle('home',home);
  $('main').hidden=home;
  $('#clear').hidden=!$('#query').value;
}
function append(count){
  if(!activeQuery)return;
  const fragment=document.createDocumentFragment();
  for(const item of results.slice(shown,shown+count))fragment.append(card(item,open));
  $('#feed').append(fragment);shown=Math.min(shown+count,results.length);
  $('#more').hidden=shown>=results.length;$('#end').hidden=!results.length||shown<results.length;
}
function render(){
  setMode();$('#feed').replaceChildren();shown=0;results=[];
  $('#empty').hidden=true;$('#more').hidden=true;$('#end').hidden=true;
  if(!activeQuery||!ready)return;
  if(activeQuery.length<CONFIG.MIN_QUERY_LENGTH){$('#status').textContent=`${CONFIG.MIN_QUERY_LENGTH}자 이상 입력해 주세요`;return;}
  results=searchItems(articles,activeQuery);
  $('#status').textContent=`‘${activeQuery}’ 관련 자료 ${results.length}개`;
  $('#empty').hidden=results.length>0;append(CONFIG.INITIAL_BATCH_SIZE);
}
async function load(){
  if(loading)return;loading=true;ready=false;
  $('#error').hidden=true;$('#notice').hidden=true;$('#empty').hidden=true;$('#end').hidden=true;$('#more').hidden=true;
  $('#feed').replaceChildren();$('#feed').setAttribute('aria-busy','true');$('#status').textContent='자료를 불러오는 중';
  for(let i=0;i<3;i++)$('#feed').append(el('div',undefined,'skeleton'));
  try{
    const {items,mode}=await loadArticles(CONFIG);articles=items;ready=true;render();
    if(mode==='fallback'){
      const notice=$('#notice');notice.replaceChildren(el('span','실시간 자료를 불러오지 못해 준비된 자료를 보여 드려요.'));
      const retry=el('button','다시 시도');retry.addEventListener('click',load);notice.append(retry);notice.hidden=false;
    }
  }catch{
    $('#feed').replaceChildren();$('#error').hidden=false;$('#status').textContent='자료를 불러올 수 없어요';
  }finally{loading=false;$('#feed').setAttribute('aria-busy','false');setMode();}
}
$('#search-form').addEventListener('submit',event=>{
  event.preventDefault();activeQuery=normalize($('#query').value);setMode();window.scrollTo({top:0});
  if(!activeQuery||ready)render();else load();
});
$('#query').addEventListener('input',()=>{
  $('#clear').hidden=!$('#query').value;
  if(!normalize($('#query').value)){activeQuery='';render();}
});
$('#clear').addEventListener('click',()=>{
  $('#query').value='';activeQuery='';render();$('#query').focus();window.scrollTo({top:0});
});
$('#retry').addEventListener('click',load);
$('#more').addEventListener('click',()=>append(CONFIG.LOAD_MORE_SIZE));
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)&&activeQuery&&ready&&shown<results.length)append(CONFIG.LOAD_MORE_SIZE);
},{rootMargin:'0px 0px 500px 0px'}).observe($('#sentinel'));
setMode();
