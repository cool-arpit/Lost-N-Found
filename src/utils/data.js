export const CATEGORIES = ['Electronics','Documents','Keys','Accessories','Books','Clothing','Stationery','Other'];
export const LOCATIONS = ['Library','Block A','Block B','Cafeteria','Sports Ground','Auditorium','Parking','Hostel','Innovation Lab','Other'];
export const NAV_ITEMS = [
  ['home','Home','⌂'],['browse','Explore','⌕'],['matches','Smart Matches','✦'],['pulse','Campus Pulse','◉'],['my','My Reports','▣']
];

const today = new Date().toISOString().slice(0,10);
export const SEED_REPORTS = [
 {id:'seed-1',type:'found',title:'White wireless earbuds',category:'Electronics',location:'Library',date:today,description:'White earbuds in a compact charging case, found near the second-floor reading area.',status:'active',owner:'Aarav',contact:'aarav@campus.edu',image:'',createdAt:Date.now()-1000*60*45},
 {id:'seed-2',type:'lost',title:'White AirPods',category:'Electronics',location:'Library',date:today,description:'White wireless earbuds, likely left near a study table.',status:'active',owner:'Meera',contact:'meera@campus.edu',image:'',createdAt:Date.now()-1000*60*80},
 {id:'seed-3',type:'found',title:'Blue student ID card',category:'Documents',location:'Cafeteria',date:today,description:'Blue university ID card found near the drinks counter.',status:'active',owner:'Kabir',contact:'kabir@campus.edu',image:'',createdAt:Date.now()-1000*60*140},
 {id:'seed-4',type:'lost',title:'Blue university ID',category:'Documents',location:'Cafeteria',date:today,description:'University ID card with a blue background and photo.',status:'active',owner:'Riya',contact:'riya@campus.edu',image:'',createdAt:Date.now()-1000*60*170},
 {id:'seed-5',type:'found',title:'Black laptop sleeve',category:'Accessories',location:'Block A',date:new Date(Date.now()-86400000).toISOString().slice(0,10),description:'Plain black laptop sleeve left outside classroom A-204.',status:'active',owner:'Dev',contact:'dev@campus.edu',image:'',createdAt:Date.now()-1000*60*300},
 {id:'seed-6',type:'found',title:'Set of keys with blue tag',category:'Keys',location:'Hostel',date:new Date(Date.now()-2*86400000).toISOString().slice(0,10),description:'Three keys on a small ring with a blue plastic tag.',status:'active',owner:'Nikhil',contact:'nikhil@campus.edu',image:'',createdAt:Date.now()-1000*60*520},
];
