import { SEED_REPORTS } from './data';
export const REPORTS_KEY='findit_reports_v2';
export const USER_KEY='findit_user_v2';
export const NOTIF_KEY='findit_notifications_v2';
export const THEME_KEY='findit_theme_v2';

export function loadJSON(key, fallback){try{const v=JSON.parse(localStorage.getItem(key));return v ?? fallback}catch{return fallback}}
export function saveJSON(key,value){localStorage.setItem(key,JSON.stringify(value));}
export function loadReports(){const v=loadJSON(REPORTS_KEY,null);return Array.isArray(v)?v:SEED_REPORTS}
export function loadUser(){return loadJSON(USER_KEY,{name:'Arpit',email:'arpit@campus.edu',course:'AI & Data Science'})}
export function loadNotifications(){return loadJSON(NOTIF_KEY,[])}
export function makeId(prefix='id'){return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`}
