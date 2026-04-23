import { Outlet } from 'react-router';

import {
  Stack
} from '@mui/material';


export default function LoginLayout() {
  return (
    <>
      <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
        <Stack direction="row" sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Outlet />
        </Stack>
      </Stack>
    </>
  )
}