import {memo} from 'react';
import {motion} from 'motion/react';
import type {Chapter} from '../data/chapters';
import {AgentLab} from '../simulations/AgentLab';
import {Assessment} from '../simulations/Assessment';
type Props={chapter:Chapter;index:number;current:number;keynote:boolean};
export const ChapterScene=memo(function ChapterScene({chapter,index,current,keynote}:Props){
 const interactive=index===6||index===7;
 return <motion.section id={chapter.id} aria-label={chapter.aria} className={chapter.cls} style={keynote&&current!==index?{display:'none'}:undefined} initial={{opacity:.8,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.12}} transition={{duration:.42}}>
 {interactive?<><div className="slide-inner"><div className="html-fragment" dangerouslySetInnerHTML={{__html:chapter.pre||''}}/>{index===6?<AgentLab active={current===index}/>:<Assessment/>}<div className="html-fragment" dangerouslySetInnerHTML={{__html:chapter.post||''}}/></div><div className="html-fragment" dangerouslySetInnerHTML={{__html:chapter.footer||''}}/></>:<div className="scene-content" dangerouslySetInnerHTML={{__html:chapter.body}}/>}
 </motion.section>;
});
