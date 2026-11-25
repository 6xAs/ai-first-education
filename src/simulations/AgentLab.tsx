import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, ClipboardList, Code2, ShieldCheck, UserRound, Play, Pause, RotateCcw } from 'lucide-react';
const stages=[
{agent:'Pesquisa',title:'Investigar',description:'O estudante entrevista o usuário. O agente organiza hipóteses.',output:'Mapa de causas e indicador de desperdício.',Icon:Search},
{agent:'Arquitetura',title:'Especificar',description:'O estudante decide o escopo e define regras. O agente ajuda a preparar critérios.',output:'Contrato: alertar antes do estoque mínimo.',Icon:ClipboardList},
{agent:'Dev',title:'Construir',description:'O estudante delega a implementação em ambiente isolado.',output:'Protótipo e alterações versionadas para revisão.',Icon:Code2},
{agent:'QA',title:'Validar',description:'O estudante revisa resultados, testa limites e decide se aprova.',output:'Relatório de testes, defesa técnica e plano de medição.',Icon:ShieldCheck}];
export function AgentLab({active}:{active:boolean}){
 const [step,setStep]=useState(0),[playing,setPlaying]=useState(false);
 useEffect(()=>{if(!active||!playing)return;const timer=window.setTimeout(()=>{if(step===3)setPlaying(false);else setStep(step+1)},2200);return()=>window.clearTimeout(timer)},[step,playing,active]);
 const choose=(i:number)=>{setPlaying(false);setStep(i)};
 const run=()=>{if(playing){setPlaying(false)}else{setStep(0);setPlaying(true)}};
 const s=stages[step];
 return <div className="simlayout">
 <div className="agent-map" aria-label="Estudante coordena quatro agentes">
 <svg className="agent-lines" aria-hidden="true" viewBox="0 0 400 340" preserveAspectRatio="none"><path d="M75 60L200 170L325 60M75 280L200 170L325 280"/></svg>
 <motion.div className="agent-center" animate={{scale:playing?[1,1.04,1]:1}} transition={{duration:.6}}><UserRound className="icon"/><b>ESTUDANTE</b></motion.div>
 {stages.map(({agent,Icon},i)=><motion.button type="button" key={agent} className={'agent-node n'+(i+1)+(i===step?' active':'')} aria-pressed={i===step} onClick={()=>choose(i)} animate={{scale:i===step?1.06:1}} whileTap={{scale:.97}}><Icon className="icon"/><b>{agent}</b></motion.button>)}
 </div><div><div className="interactive-tabs" aria-label="Etapas da simulação">{stages.map((a,i)=><button type="button" key={a.title} aria-pressed={i===step} className={i===step?'chosen':''} onClick={()=>choose(i)}>{a.title}</button>)}</div>
 <AnimatePresence mode="wait" initial={false}><motion.div key={step} className="sim-output" initial={{opacity:.35,x:9}} animate={{opacity:1,x:0}} exit={{opacity:.3,x:-9}} transition={{duration:.2}} aria-live="polite"><h3>0{step+1} · {s.title}</h3><p>{s.description}</p><div className="artifact">Saída: {s.output}</div></motion.div></AnimatePresence>
 <div className="sim-actions"><button type="button" className="play-btn" onClick={run} aria-pressed={playing}>{playing?<Pause className="icon"/>:<Play className="icon"/>}{playing?'Pausar simulação':'Executar simulação'}</button><button type="button" className="reset-btn" aria-label="Reiniciar simulação" onClick={()=>choose(0)}><RotateCcw size={19}/></button></div>
 <p className="sim-caption">Simulação didática local · nenhum agente real é executado.</p></div></div>;
}
