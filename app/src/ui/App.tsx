import { HashRouter, Route, Routes, Navigate } from 'react-router';

import '@fontsource/source-code-pro/400.css';
import '@fontsource/source-code-pro/500.css';
import '@fontsource/source-code-pro/700.css';
import './index.css';

import CssBaseline from '@mui/material/CssBaseline';

import MainLayout from '@layout/MainLayout/MainLayout';
import LoginLayout from '@layout/LoginLayout/LoginLayout';

import { MainPage } from '@pages/MainPage';
import { SettingsPage } from '@pages/SettingsPage';
import { LoginPage } from '@pages/LoginPage';
import { BrokerMonitorPage } from '@pages/BrokerMonitorPage';

import { AppProviders } from '@/shared/components/AppProviders/AppProviders';

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
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/monitor' element={<BrokerMonitorPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </AppProviders>
    </HashRouter>
  )
}