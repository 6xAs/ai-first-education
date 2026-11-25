import {useCallback,useEffect,useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {chapters} from './data/chapters';
import {Navigation} from './components/Navigation';
import {ChapterScene} from './components/ChapterScene';
function initialIndex(){const id=window.location.hash.slice(1);const i=chapters.findIndex(c=>c.id===id);return i<0?0:i}
export function App(){
 const [current,setCurrent]=useState(initialIndex);
 const [keynote,setKeynote]=useState(false);
 const [fullscreen,setFullscreen]=useState(false);
 const reduce=useReducedMotion();
 const go=useCallback((requested:number)=>{
 const i=Math.max(0,Math.min(chapters.length-1,requested));setCurrent(i);
 window.history.replaceState(null,'','#'+chapters[i].id);
 window.requestAnimationFrame(()=>document.getElementById(chapters[i].id)?.scrollIntoView({behavior:reduce||keynote?'instant':'smooth',block:'start'}));
 },[keynote,reduce]);
 useEffect(()=>{document.documentElement.classList.add('enhanced');return()=>document.documentElement.classList.remove('enhanced')},[]);
 useEffect(()=>{if(keynote)return;let raf=0;const update=()=>{raf=0;let best=0,distance=Infinity;const marker=Math.min(window.innerHeight*.3,220);chapters.forEach((c,i)=>{const rect=document.getElementById(c.id)?.getBoundingClientRect();if(!rect)return;const d=rect.top<=marker&&rect.bottom>marker?0:Math.min(Math.abs(rect.top-marker),Math.abs(rect.bottom-marker));if(d<distance){best=i;distance=d}});setCurrent(best)};const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};const hashIndex=initialIndex();if(hashIndex>0)requestAnimationFrame(()=>document.getElementById(chapters[hashIndex].id)?.scrollIntoView({behavior:'instant'}));else update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(raf)}},[keynote]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.altKey||e.ctrlKey||e.metaKey||(e.target instanceof HTMLElement&&e.target.closest('button,input,textarea,a,summary,select,[contenteditable]')))return;const next=['ArrowRight','PageDown',' '].includes(e.key),prev=['ArrowLeft','PageUp'].includes(e.key);if(next||prev||e.key==='Home'||e.key==='End'){e.preventDefault();go(e.key==='Home'?0:e.key==='End'?chapters.length-1:current+(next?1:-1))}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[current,go]);
 useEffect(()=>{const onFull=()=>setFullscreen(!!document.fullscreenElement);document.addEventListener('fullscreenchange',onFull);return()=>document.removeEventListener('fullscreenchange',onFull)},[]);
 const toggleMode=()=>{window.history.replaceState(null,'','#'+chapters[current].id);setKeynote(v=>!v);window.requestAnimationFrame(()=>document.getElementById(chapters[current].id)?.scrollIntoView({behavior:'instant'}))};
 const toggleFull=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{ /* native support varies */ }};
 return <><Navigation current={current} keynote={keynote} go={go} toggleMode={toggleMode} fullscreen={fullscreen} toggleFull={toggleFull} canFull={!!document.fullscreenEnabled}/><main className={keynote?'keynote-mode':'explore-mode'} onClick={e=>{const a=(e.target as HTMLElement).closest?.('a[href^="#s"]');const href=a?.getAttribute('href');const i=chapters.findIndex(s=>'#'+s.id===href);if(i>=0){e.preventDefault();go(i)}}}>{chapters.map((chapter,index)=><ChapterScene key={chapter.id} chapter={chapter} index={index} current={current} keynote={keynote}/>)}</main><footer className="experience-footer flex flex-wrap justify-center gap-4"><a href="./keynote-offline.html">Versão HTML autônoma</a><span>Proposta conceitual · 2026–2031</span></footer></>;
}
