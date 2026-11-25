import React from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { App } from './App';
import './styles/experience.css';
const root=document.getElementById('root');
if(root){createRoot(root).render(<React.StrictMode><MotionConfig reducedMotion="user"><App/></MotionConfig></React.StrictMode>);}
