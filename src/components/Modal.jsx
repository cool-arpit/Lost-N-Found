import React from 'react';
export default function Modal({title,children,onClose,wide=false}){return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className={`modal ${wide?'wide':''}`}><div className="modal-head"><h2>{title}</h2><button onClick={onClose}>×</button></div>{children}</div></div>}
