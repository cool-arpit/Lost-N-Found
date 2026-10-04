export function tokenize(text=''){return [...new Set(text.toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>2))]}
export function explainMatch(a,b){
 if(!a||!b||a.id===b.id||a.type===b.type||a.status!=='active'||b.status!=='active') return {score:0,reasons:[]};
 let score=0; const reasons=[];
 if(a.category===b.category){score+=35;reasons.push('Same category')}
 if(a.location===b.location){score+=30;reasons.push('Same location')}
 const days=Math.abs(new Date(a.date)-new Date(b.date))/86400000;
 if(days===0){score+=20;reasons.push('Same day')} else if(days<=1){score+=15;reasons.push('Within 1 day')} else if(days<=3){score+=8;reasons.push('Within 3 days')}
 const aw=tokenize(`${a.title} ${a.description}`); const bw=new Set(tokenize(`${b.title} ${b.description}`));
 const overlap=aw.filter(w=>bw.has(w)); const desc=Math.min(15,overlap.length*3); if(desc){score+=desc;reasons.push(`${overlap.length} description word${overlap.length===1?'':'s'} overlap`)}
 return {score:Math.min(100,score),reasons};
}
export function scoreMatch(a,b){return explainMatch(a,b).score}
export function getMatchesFor(report,reports,min=45){return reports.map(other=>{const e=explainMatch(report,other);return {a:report,b:other,score:e.score,reasons:e.reasons}}).filter(x=>x.score>=min).sort((a,b)=>b.score-a.score)}
export function matchLabel(score){if(score>=85)return 'Excellent match';if(score>=70)return 'Strong match';return 'Possible match'}
