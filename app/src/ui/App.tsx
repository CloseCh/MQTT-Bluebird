import { HashRouter, Route, Routes, Navigate } from 'react-router';

import '@fontsource/source-code-pro/400.css';
import '@fontsource/source-code-pro/500.css';
import '@fontsource/source-code-pro/700.css';

import MainPage from './layout/MainLayout/page/MainPage/MainPage';
import MainLayout from './layout/MainLayout/MainLayout';
import LoginLayout from './layout/LoginLayout/LoginLayout';
import LoginPage from './layout/LoginLayout/page/LoginPage';
import SettingsPage from './layout/MainLayout/page/SettingsPage/SettingsPage';
import { BrokerMonitorPage } from '@/features/brockerMonitor';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { AppProviders } from './shared/components/AppProviders/AppProviders';
import Header from './shared/components/Header/Header';

export default function App() {
  return (
    <HashRouter>
      <AppProviders>
        <CssBaseline />
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Header title='MQTT Bluebird' />
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
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
          </Box>
        </Box>
      </AppProviders>
    </HashRouter>
  )
}