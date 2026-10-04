export function prettyDate(d){if(!d)return '';return new Date(`${d}T00:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
export function timeAgo(ts){const diff=Math.max(0,Date.now()-ts);const m=Math.floor(diff/60000);if(m<1)return 'just now';if(m<60)return `${m}m ago`;const h=Math.floor(m/60);if(h<24)return `${h}h ago`;return `${Math.floor(h/24)}d ago`}
