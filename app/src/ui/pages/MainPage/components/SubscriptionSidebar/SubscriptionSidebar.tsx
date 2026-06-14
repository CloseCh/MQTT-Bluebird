import { SubscriptionButton, SubscriptionList } from '@/features/messageSubscription';
import { TableSelectionSelector } from '@/features/messageRepresentacion';
import { SideBar } from '@/features/navigation';
import { Box } from '@mui/material';

export function SubscriptionSidebar() {
  return (
    <SideBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          width: '100%',
        }}
      >
        <Box sx={{ flex: '0 0 auto', minHeight: 0 }}>
          <TableSelectionSelector styleProp={{ p: '10px 10px 10px 10px' }} />
        </Box>

        <Box sx={{ flex: '1 1 0', minHeight: 0, overflow: 'auto' }}>
          <SubscriptionList />
        </Box>

        <Box
          sx={{
            flex: '0 0 auto',
            minHeight: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SubscriptionButton />
        </Box>
      </Box>
    </SideBar>
  );
}