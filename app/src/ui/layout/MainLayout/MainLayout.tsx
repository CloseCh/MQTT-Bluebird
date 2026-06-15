import { Outlet, useNavigate } from 'react-router';

import {
  Stack
} from '@mui/material';

import { NavBar } from './components/NavBar/NavBar';
import { useConnectionContext } from '@/features/brockerConnection/';
import { useEffect } from 'react';
import Header from '@/shared/components/Header/Header';

export default function MainLayout() {
  const { isConnected } = useConnectionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) void navigate('/login');
  }, [isConnected, navigate]);
  
  return (
    <Stack sx={{ height: '100%', overflow: 'hidden' }}>
      <Header title='MQTT Bluebird'/>
      <NavBar />
      <Stack sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Outlet />
      </Stack>
    </Stack>
  )
}