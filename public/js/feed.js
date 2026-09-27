export const types = {article:'기사',sns:'SNS 글',chart:'그래프',report:'보고서',blog:'블로그',photo:'사진 자료',card:'카드뉴스'};
export function el(tag, text, className) {const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
export function imageNode(item) {
  if (!item.image) return null;
  let url;try{url=new URL(item.image,document.baseURI);}catch{return null;}
  if (!['http:','https:'].includes(url.protocol)) return null;
  const image=el('img',undefined,'media');image.src=url.href;image.alt=item.title+' 관련 이미지';image.loading='lazy';image.decoding='async';image.referrerPolicy='no-referrer';image.addEventListener('error',()=>image.remove(),{once:true});return image;
}
export function card(item,open) {
  const article=el('article',undefined,'card'), button=el('button',undefined,'card-link');
  button.type='button';button.setAttribute('aria-label',item.title+' 전체 읽기');
  const image=imageNode(item);if(image)button.append(image);
  button.append(el('span',types[item.type]||'자료','type'),el('h2',item.title),el('p',item.summary,'summary'));
  const meta=el('div',undefined,'meta');meta.append(el('span',item.source||'출처: 표시 없음'),el('span',item.date||'날짜: 표시 없음'));
  button.append(meta);button.addEventListener('click',()=>open(item,button));article.append(button);return article;
}
