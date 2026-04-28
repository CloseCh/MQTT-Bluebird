import { Outlet } from 'react-router';

import {
  Stack
} from '@mui/material';

export default function LoginLayout() {
  return (
    <>
        <Stack
          sx={{
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Outlet />
        </Stack>
    </>
  )
}