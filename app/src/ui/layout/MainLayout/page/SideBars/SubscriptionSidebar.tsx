import { TopicList } from "@/features/messageRepresentacion";
import { SubscriptionField, SubscriptionList } from "@/features/messageSubscription";
import { SideBar } from "@/features/navigation";
import { Box, Divider, Stack } from "@mui/material";

export function SubscriptionSidebar() {
  return (
    <SideBar>
      <Stack sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '40%', width: '100%', overflow: 'auto' }}>
          <Stack>
            <Box sx={{ height: '40%', width: '100%', overflow: 'auto' }}>
              <SubscriptionField />
            </Box>
            <Divider />
            <Box sx={{ height: '60%', width: '100%', overflow: 'auto' }}>
              <SubscriptionList />
            </Box>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ height: '60%', width: '100%', overflow: 'auto' }}>
          <TopicList />
        </Box>
      </Stack>
    </SideBar>
  );
}