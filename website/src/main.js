import {createClient} from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL,key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const configured=!!(url&&key&&!url.includes('YOUR_')&&!key.includes('YOUR_'));
const client=configured?createClient(url,key):null;
window.RespawnBackend={client,configured};
// These classic scripts preserve the exact existing visual UI and original bank.
for(const file of ['dsa-bank.js','problem-links.js','dsa-planner.js','app.js','dsa-ui.js','extra-curriculum.js','enhanced.js']){
 await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/'+file+'?v=20261027-links';s.onload=resolve;s.onerror=()=>reject(new Error('Could not load '+file));document.body.append(s)});
}
