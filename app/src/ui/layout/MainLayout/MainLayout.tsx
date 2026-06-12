import { Outlet, useNavigate } from 'react-router';

import {
  Stack
} from '@mui/material';

import { NavBar } from '@/features/navigation/index';
import { useConnectionContext } from '@/features/brockerConnection/';
import { useEffect } from 'react';

export default function MainLayout() {
  const { isConnected } = useConnectionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) void navigate('/login');
  }, [isConnected, navigate]);
  
  return (
    <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
      <NavBar />
      <Stack sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Outlet />
      </Stack>
    </Stack>
  )
}