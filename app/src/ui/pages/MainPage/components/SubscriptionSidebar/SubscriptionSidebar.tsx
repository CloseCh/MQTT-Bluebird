import { SubscriptionButton } from '@/features/messageSubscription';
import { TableSelectionSelector } from '@/features/messageRepresentacion';
import { Box } from '@mui/material';
import TopicTreeView from '../TopicTreeView/TopicTreeView';
import { SideBar } from '@/shared/components/SideBar/SideBar';

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
          <TopicTreeView />
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