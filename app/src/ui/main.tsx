import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  
  BrowserRouter,
  Routes,
  Route 
} from "react-router";

import Main from './pages/main/Main.tsx';
import Subscription from './pages/subscription/Subscription.tsx';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);