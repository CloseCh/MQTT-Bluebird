import { useState } from 'react';
import { Box } from '@mui/material';
import type { ReactElement } from 'react';
import { ResizeHandle } from './ResizeHandle/ResizeHandle';
import { useNavigationStore } from '@/stores/navigationStore/navigationStore';

interface Prop {
  children: ReactElement;
}

export function SideBar({ children }: Prop) {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const openedSidebar = useNavigationStore(s => s.openedSidebar);
  const showSidebar = openedSidebar !== '';

  return (
    <>
      <Box sx={{
        width: showSidebar ? sidebarWidth : 0,
        flexShrink: 0,
        height: '100%',
        overflow: 'hidden'
      }}>
        {children}
      </Box>
      {showSidebar
        ? <ResizeHandle initialSize={sidebarWidth} onResize={setSidebarWidth} min={100} max={500} />
        : <></>
      }
    </>
  );
}