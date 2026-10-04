import React from 'react';
export default function StatCard({icon,label,value,sub}){return <div className="stat-card"><div className="stat-icon">{icon}</div><div><div className="stat-value">{value}</div><div className="stat-label">{label}</div>{sub&&<div className="stat-sub">{sub}</div>}</div></div>}
