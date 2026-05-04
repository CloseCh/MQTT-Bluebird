import { TopicList } from "@/features/messageRepresentacion";
import { SubscriptionField, SubscriptionList } from "@/features/messageSubscription";
import { OVERLAY_IDS, SideBar, useNavigationStore } from "@/features/navigation";
import { Box, Divider, Stack } from "@mui/material";

export function SubscriptionSidebar() {
  const tableConfig = useNavigationStore(s => s.tableConfig);

  let sidebarComponents = DefaultSubscriptionSidebar();

  if (tableConfig === OVERLAY_IDS.TABLE_TOPIC || tableConfig === OVERLAY_IDS.TABLE_LAST) {
    sidebarComponents = SubscriptionSidebarWithOutList();
  }

  return (
    <SideBar>
      {sidebarComponents}
    </SideBar>
  );
}

function DefaultSubscriptionSidebar() {
  return (
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
  );
}

function SubscriptionSidebarWithOutList() {
  return (
    <Stack sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
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
    </Stack>
  );
}