import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Outlet } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header';
import Stack from '@mui/material/Stack';

import { MQTTProvider } from '@/features/messageRepresentacion';
import NavBar from './components/NavBar/NavBar.jsx';

export default function App() {
  return (
    <>
      <CssBaseline />
      <MQTTProvider dataPointCount={100}>
        <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
          <Header />
          <Stack direction="row" sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <NavBar />
            <Outlet />
          </Stack>
        </Stack>
      </MQTTProvider>
    </>
  )
}


