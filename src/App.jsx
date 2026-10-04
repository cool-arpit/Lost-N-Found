import React,{useEffect,useMemo,useState} from 'react';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import ReportForm from './components/ReportForm';
import { loadReports,saveJSON,loadUser,loadNotifications,REPORTS_KEY,USER_KEY,NOTIF_KEY,THEME_KEY,makeId } from './utils/storage';
import { getMatchesFor,explainMatch } from './utils/matching';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Matches from './pages/Matches';
import Pulse from './pages/Pulse';
import MyReports from './pages/MyReports';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { timeAgo } from './utils/ui';

function seedNotifications(reports){
 const saved=loadNotifications();
 if(saved.length)return saved;
 const active=reports.filter(r=>r.status==='active');
 const pairs=[]; for(const a of active){const ms=getMatchesFor(a,active.filter(x=>x.id!==a.id));if(ms[0])pairs.push({a,b:ms[0].b,score:ms[0].score})}
 const unique=pairs.filter((x,i)=>pairs.findIndex(y=>y.a.id===x.a.id&&y.b.id===x.b.id)===i).slice(0,3);
 return unique.map(x=>({id:makeId('n'),icon:'✦',title:`${x.score}% possible match`,body:`“${x.a.title}” may match “${x.b.title}” near ${x.b.location}.`,createdAt:Date.now()-Math.floor(Math.random()*3600000),read:false}));
}

export default function App(){
 const [reports,setReports]=useState(loadReports); const [user,setUser]=useState(loadUser); const [notifications,setNotifications]=useState(()=>seedNotifications(loadReports()));
 const [page,setPage]=useState('home'); const [theme,setTheme]=useState(localStorage.getItem(THEME_KEY)||'light');
 const [query,setQuery]=useState(''); const [filterType,setFilterType]=useState('all'); const [filterCategory,setFilterCategory]=useState('all'); const [filterLocation,setFilterLocation]=useState('all');
 const [selected,setSelected]=useState(null); const [editing,setEditing]=useState(null); const [profile,setProfile]=useState(false); const [verify,setVerify]=useState(null); const [toast,setToast]=useState('');
 useEffect(()=>saveJSON(REPORTS_KEY,reports),[reports]); useEffect(()=>saveJSON(NOTIF_KEY,notifications),[notifications]); useEffect(()=>saveJSON(USER_KEY,user),[user]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem(THEME_KEY,theme)},[theme]);
 useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),3000);return()=>clearTimeout(t)}},[toast]);
 useEffect(()=>{const fn=()=>setPage('report');window.addEventListener('findit-report',fn);return()=>window.removeEventListener('findit-report',fn)},[]);
 const active=reports.filter(r=>r.status==='active');
 const userReports=reports.filter(r=>r.owner===user.name || r.contact===user.email);
 const userActive=userReports.filter(r=>r.status==='active');
 const matches=useMemo(()=>userActive.flatMap(a=>getMatchesFor(a,active.filter(b=>b.id!==a.id))),[userActive,active]);
 const allMatches=useMemo(()=>active.flatMap(a=>getMatchesFor(a,active.filter(b=>b.id!==a.id))).filter((x,i,arr)=>arr.findIndex(y=>y.a.id===x.a.id&&y.b.id===x.b.id)===i),[active]);
 const filtered=useMemo(()=>reports.filter(r=>{const q=query.trim().toLowerCase();return(!q||`${r.title} ${r.description} ${r.category} ${r.location}`.toLowerCase().includes(q))&&(filterType==='all'||r.type===filterType)&&(filterCategory==='all'||r.category===filterCategory)&&(filterLocation==='all'||r.location===filterLocation)}).sort((a,b)=>b.createdAt-a.createdAt),[reports,query,filterType,filterCategory,filterLocation]);
 const stats={lost:active.filter(r=>r.type==='lost').length,found:active.filter(r=>r.type==='found').length,resolved:reports.filter(r=>r.status==='resolved').length,matches:allMatches.length};
 const notify=(msg)=>setToast(msg);
 function addNotification(n){setNotifications(v=>[{id:makeId('n'),createdAt:Date.now(),read:false,...n},...v].slice(0,30))}
 function addReport(data){const item={...data,id:makeId('report'),owner:user.name,contact:user.email,status:'active',createdAt:Date.now()};setReports(v=>[item,...v]);const possible=getMatchesFor(item,[...active]);if(possible[0])addNotification({icon:'✦',title:`${possible[0].score}% possible match found`,body:`Your “${item.title}” may match “${possible[0].b.title}” near ${possible[0].b.location}.`});setPage('matches');notify(possible[0]?`Report published — we found a ${possible[0].score}% match.`:'Report published successfully.');}
 function updateReport(data){setReports(v=>v.map(r=>r.id===data.id?data:r));setEditing(null);notify('Report updated.');}
 function deleteReport(id){if(!window.confirm('Delete this report permanently?'))return;setReports(v=>v.filter(r=>r.id!==id));setSelected(null);notify('Report deleted.');}
 function resolveReport(id){setReports(v=>v.map(r=>r.id===id?{...r,status:'resolved'}:r));setSelected(null);addNotification({icon:'✓',title:'Report recovered',body:'Your item has been marked as recovered.'});notify('Marked as recovered.');}
 function saveProfile(u){setUser(u);setProfile(false);notify('Profile updated.');}
 function resetFilters(){setQuery('');setFilterType('all');setFilterCategory('all');setFilterLocation('all')}
 function openItem(item){setSelected(item)}
 return <div className="app"><Navbar page={page} setPage={setPage} user={user} theme={theme} setTheme={setTheme} onProfile={()=>setProfile(true)} unread={notifications.filter(n=>!n.read).length}/>
   <main>
    {page==='home'&&<Home stats={stats} reports={reports} matches={matches} setPage={setPage} setQuery={setQuery} onOpen={openItem} notifications={notifications}/>} 
    {page==='browse'&&<Browse items={filtered} query={query} setQuery={setQuery} type={filterType} setType={setFilterType} category={filterCategory} setCategory={setFilterCategory} location={filterLocation} setLocation={setFilterLocation} onOpen={openItem} onReset={resetFilters}/>} 
    {page==='matches'&&<Matches matches={matches} onOpen={openItem} onReport={()=>setPage('report')}/>} 
    {page==='pulse'&&<Pulse reports={reports} stats={stats} onOpen={openItem}/>} 
    {page==='my'&&<MyReports reports={userReports} onOpen={openItem} onEdit={setEditing} onDelete={deleteReport} onResolve={resolveReport} onReport={()=>setPage('report')}/>} 
    {page==='notifications'&&<Notifications items={notifications} onRead={id=>setNotifications(v=>v.map(n=>n.id===id?{...n,read:true}:n))} onClear={()=>setNotifications([])}/>} 
    {page==='report'&&<ReportForm user={user} onCancel={()=>setPage('home')} onSubmit={addReport}/>} 
   </main>
   <footer><span>findit · smart campus recovery network</span><span>Local demo · no API key required</span></footer>
   {selected&&<ItemDetail item={selected} currentUser={user} onClose={()=>setSelected(null)} onEdit={()=>{setEditing(selected);setSelected(null)}} onDelete={()=>deleteReport(selected.id)} onResolve={()=>resolveReport(selected.id)} onVerify={()=>setVerify(selected)} isMine={selected.owner===user.name||selected.contact===user.email}/>} 
   {editing&&<Modal title="Edit report" onClose={()=>setEditing(null)} wide><ReportForm initial={editing} user={user} onCancel={()=>setEditing(null)} onSubmit={updateReport}/></Modal>}
   {profile&&<Profile user={user} onClose={()=>setProfile(false)} onSave={saveProfile}/>} 
   {verify&&<Verification item={verify} onClose={()=>setVerify(null)} onSubmit={()=>{setVerify(null);addNotification({icon:'🛡',title:'Verification request sent',body:`Your verification request for “${verify.title}” has been recorded locally.`});notify('Verification request sent securely.')}}/>}
   {toast&&<div className="toast">{toast}</div>}
 </div>
}

function ItemDetail({item,currentUser,onClose,onEdit,onDelete,onResolve,onVerify,isMine}){return <Modal title={item.title} onClose={onClose} wide><div className="detail-grid"><div className="detail-visual">{item.image?<img src={item.image} alt=""/>:<span>{item.type==='lost'?'↯':'✓'}</span>}<span className={`pill ${item.type}`}>{item.type==='lost'?'Lost':'Found'}</span></div><div className="detail-copy"><div className="detail-tags"><span>⌖ {item.location}</span><span>◈ {item.category}</span><span>◷ {item.date}</span></div><h3>{item.description}</h3><p>Reported by <b>{item.owner}</b></p>{item.status==='resolved'&&<div className="resolved-banner">✓ This report is marked recovered</div>}{!isMine&&item.status==='active'&&<button className="primary-button full-button" onClick={onVerify}>🛡 Request ownership verification</button>}{isMine&&item.status==='active'&&<div className="modal-actions"><button className="secondary-button" onClick={onEdit}>Edit</button><button className="primary-button" onClick={onResolve}>✓ Mark recovered</button><button className="danger-button" onClick={onDelete}>Delete</button></div>}</div></div></Modal>}

function Verification({item,onClose,onSubmit}){const [answer,setAnswer]=useState('');const [detail,setDetail]=useState('');return <Modal title="Safe handover verification" onClose={onClose}><div className="verification"><div className="shield">🛡</div><p>Before meeting the finder, prove you know a private detail about <b>{item.title}</b>. Don't share sensitive information publicly.</p><label>What colour or identifying detail does the item have?<input value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="e.g. small blue sticker"/></label><label>Optional note<textarea value={detail} onChange={e=>setDetail(e.target.value)} placeholder="Anything the finder should know..."/></label><button className="primary-button full-button" disabled={!answer.trim()} onClick={onSubmit}>Send verification request →</button></div></Modal>}
