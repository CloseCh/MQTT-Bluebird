import { Outlet, useNavigate } from 'react-router';

import {
  Stack
} from '@mui/material';

import Header from '../../shared/components/Header/Header';
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
      <Header title='MQTT Bluebird' />
      <Stack direction='row' sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <NavBar />
        <Outlet />
      </Stack>
    </Stack>
  )
}