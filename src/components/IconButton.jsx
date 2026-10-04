import React from 'react';
export default function IconButton({children,label,onClick,active=false}){return <button className={`icon-button ${active?'is-active':''}`} aria-label={label} title={label} onClick={onClick}>{children}</button>}
