import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  
  HashRouter,
  Routes,
  Route 
} from 'react-router';

import App from './App.tsx';
import MainPage from './layout/pages/main/MainPage.jsx';

import PublishLayout from './layout/PublishLayout/PublishLayout.tsx';
import PublishPage from './layout/pages/publish/PublishPage.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<MainPage />} />
        </Route>

        <Route element={<PublishLayout />}>
          <Route path='publish' element={<PublishPage/>}/>
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);