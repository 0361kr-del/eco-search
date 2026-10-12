export const normalize = value => String(value ?? '').normalize('NFKC').replace(/#/g,' ').trim().toLowerCase().replace(/\s+/g,' ');
const compact = value => normalize(value).replace(/[^\p{L}\p{N}]/gu,'');
// Equivalent names only. Broader subject relationships are curated in Sheet tags.
const groups = [
 ['환경오염','환경 오염'],['환경문제','환경 문제'],
 ['인공지능','AI','에이아이'],['기후변화','기후 변화'],
 ['지구온난화','지구 온난화'],['대기오염','공기오염','대기 오염','공기 오염'],
 ['스마트팜','스마트농장','스마트 농장'],['저출산','저 출산'],
 ['고령화','노령화'],['감염병','전염병'],
 ['미래직업','미래 직업'],['미래일자리','미래 일자리'],
 ['이산화탄소','이산화 탄소','CO2','CO₂'],
 ['KBO','한국프로야구'],['MLB','메이저리그'],['EPL','프리미어리그'],
 ['K리그','케이리그'],['K리그2','케이리그2']
].map(group=>[...new Set(group.map(compact))]);
const aliases = new Map(groups.flatMap(group=>group.map(term=>[term,group])));
function queryTerms(query){
 const words=normalize(query).split(/\s+/).filter(Boolean),out=[];
 for(let i=0;i<words.length;){
   let term=compact(words[i]),count=1;
   for(let size=Math.min(4,words.length-i);size>1;size--){
     const candidate=compact(words.slice(i,i+size).join(''));
     if(aliases.has(candidate)){term=candidate;count=size;break;}
   }
   if(term)out.push(term);i+=count;
 }
 return [...new Set(out)];
}
export function searchItems(items,query){
 const phrase=compact(query),terms=queryTerms(query);
 if(!terms.length)return [];
 return items.map((item,index)=>{
   const title=compact(item.title),summary=compact(item.summary);
   const tags=(item.tags||[]).map(compact),keywords=(item.keywords||[]).map(compact);
   let score=title===phrase?100:0,matched=0;
   for(const term of terms){
     let best=0;
     for(const variant of aliases.get(term)||[term]){
       const contains=text=>text===variant||(variant.length>=2&&text.includes(variant));
       const points=(contains(title)?8:0)+(tags.some(t=>t===variant)?7:tags.some(contains)?4:0)
         +(keywords.some(t=>t===variant)?5:keywords.some(contains)?3:0)+(contains(summary)?2:0);
       best=Math.max(best,points*(variant===term?1:0.8));
     }
     if(best>0)matched++;score+=best;
   }
   if(matched===terms.length)score+=15;
   // Prefer coverage of all requested concepts before partial matches.
   return {item,index,score,matched,exact:title===phrase,coverage:matched/terms.length};
 }).filter(row=>row.matched>0).sort((a,b)=>Number(b.exact)-Number(a.exact)||b.coverage-a.coverage||b.score-a.score||a.index-b.index).map(row=>row.item);
}
export function weightedOrder(items, random = Math.random) {
  return items.map(item => ({item, key: -Math.log(Math.max(Number.MIN_VALUE,random())) / Math.max(0.01, Number(item.feedWeight) || 1)}))
    .sort((a,b) => a.key-b.key).map(row => row.item);
}
