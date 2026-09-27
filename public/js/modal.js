import {el,imageNode,types} from './feed.js';
export function createDetail() {
  const dialog=document.querySelector('#detail'),body=document.querySelector('#detail-body');
  let trigger=null;
  function close(){if(history.state?.ecoDetail)history.back();else dialog.close();}
  document.querySelector('#back').addEventListener('click',close);
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus({preventScroll:true});});
  window.addEventListener('popstate',()=>{if(dialog.open)dialog.close();});
  return function open(item,button) {
    trigger=button;body.replaceChildren();
    const title=el('h1',item.title);title.id='detail-title';body.append(title);
    const metadata=el('dl');
    for(const [name,value] of [['출처',item.source],['작성자',item.author],['날짜',item.date],['자료 유형',types[item.type]||item.type]])metadata.append(el('dt',name),el('dd',value||'표시 없음'));
    body.append(metadata);const image=imageNode(item);if(image)body.append(image);
    body.append(el('div',item.content,'content'));
    const tags=el('div',undefined,'tags');for(const tag of item.tags)tags.append(el('span','#'+tag));body.append(tags);
    history.pushState({ecoDetail:true},'');document.body.style.overflow='hidden';dialog.showModal();dialog.scrollTop=0;
  };
}
