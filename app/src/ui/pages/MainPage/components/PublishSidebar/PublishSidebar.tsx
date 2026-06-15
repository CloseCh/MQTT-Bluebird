import { PublishForm } from '@/features/messagePublish';
import { SideBar } from '@/shared/components/SideBar/SideBar';
import { Box, Stack } from '@mui/material';

export function PublishSidebar() {
  return (
    <SideBar>
      <Stack sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '50%', width: '100%', overflow: 'auto' }}>
          <PublishForm />
        </Box>
      </Stack>
    </SideBar>
  );
}