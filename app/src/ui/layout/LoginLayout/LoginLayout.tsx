import { Outlet } from 'react-router';

import {
  Stack
} from '@mui/material';

import { ConnectionProvider } from '@/features/brockerConnection/hooks';


export default function LoginLayout() {
  return (
    <>
      <ConnectionProvider>
        <Stack
          sx={{
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Outlet />
        </Stack>
      </ConnectionProvider>
    </>
  )
}