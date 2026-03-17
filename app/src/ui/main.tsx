import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  
  HashRouter,
  Routes,
  Route 
} from "react-router";

import MainPage from './pages/main/MainPage.jsx';
import Subscription from './pages/subscription/Subscription.jsx';
import PublishPage from './pages/publish/PublishPage.jsx';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="publish" element={<PublishPage />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);