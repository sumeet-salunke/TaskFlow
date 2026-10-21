import { StrictMode } from 'react'; // helps identify certain potential problems during development

import { createRoot } from 'react-dom/client';//creates a root attached to a DOM element
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

//TypeScript knows that document.getElementById() might return either an HTMLElement or null. The ! tells TypeScript, "Trust me, this value is not null."
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    
  </StrictMode>
);
