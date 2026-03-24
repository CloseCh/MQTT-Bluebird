import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Outlet } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header';
import Stack from '@mui/material/Stack';

import { MQTTProvider } from '@/features/messageRepresentacion';


export default function App() {
  return (
    <>
      <CssBaseline />
        <MQTTProvider dataPointCount={100}>
        <Stack sx={{ height: '100vh', overflow: 'hidden' }}>

  <Header />  {/* ocupa su altura natural */}

  <Stack sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
    <Outlet />
  </Stack>

</Stack>
      </MQTTProvider>
    </>
  )
}


