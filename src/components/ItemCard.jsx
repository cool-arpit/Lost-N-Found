import React from 'react';
import { prettyDate } from '../utils/ui';
export default function ItemCard({item,onOpen,compact=false}){
 return <button className={`item-card ${compact?'compact':''}`} onClick={()=>onOpen(item)}>
   <div className={`item-image ${item.image?'has-image':''}`}>{item.image?<img src={item.image} alt=""/>:<span>{item.type==='lost'?'↯':'✓'}</span>}</div>
   <div className="item-main"><div className="item-top"><span className={`pill ${item.type}`}>{item.type==='lost'?'Lost':'Found'}</span><span className="date">{prettyDate(item.date)}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="meta"><span>⌖ {item.location}</span><span>◈ {item.category}</span></div></div>
 </button>
}
