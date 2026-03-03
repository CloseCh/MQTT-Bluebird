import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Outlet } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Header from './components/header/Header';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Grid container direction="column">
        <Grid size={12}>
          <Header />
        </Grid>
        <Grid
          container
          size={12}
          sx={{
            flexGrow: 1,
            maxWidth: '100%',
            height: '100%',
            mt: 1
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}


