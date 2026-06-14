import { SubscriptionList } from '@/features/messageSubscription';
import { TableSelectionSelector } from '@/features/messageRepresentacion';
import { SideBar } from '@/features/navigation';
import { Box, Divider, Stack } from '@mui/material';

export function SubscriptionSidebar() {
  return (
    <SideBar>
      <Stack sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
          <Stack>
            <TableSelectionSelector styleProp={{ p: '10px 10px 10px 10px' }}/>
            <Box sx={{ height: '60%', width: '100%', overflow: 'auto' }}>
              <SubscriptionList />
            </Box>
          </Stack>
        </Box>
        <Divider />
      </Stack>
    </SideBar>
  );
}