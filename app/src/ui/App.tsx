import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router';

import MainPage from './layout/MainLayout/page/MainPage';
import MainLayout from './layout/MainLayout/MainLayout';
import LoginLayout from './layout/LoginLayout/LoginLayout';
import LoginPage from './layout/LoginLayout/page/LoginPage';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProviders } from './utils/composeProviders';

export default function App() {
  return (
    <HashRouter>
      <AppProviders>
        <CssBaseline />
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path='/login' element={<LoginPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path='/' element={<MainPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </AppProviders>
    </HashRouter>
  )
}