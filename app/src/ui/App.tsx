import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Outlet } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Header from './components/Header/Header';
import { MQTTProvider } from './hooks/useMQTTContext/useMQTTContext';

export default function App() {
  return (
    <>
      <CssBaseline />
        <MQTTProvider dataPointCount={100}>
        <Grid container direction="column" sx={{ height: '100vh', width: '100vw' }}>
          <Grid size={12}>
            <Header />
          </Grid>
          <Grid
            container
            size={12}
            sx={{
              flexGrow: 1,
              height: '100vh', 
              width: '100vw',
              overflow: 'hidden'
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
      </MQTTProvider>
    </>
  )
}


