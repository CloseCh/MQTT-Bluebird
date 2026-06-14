import { MessageDetail } from '@/features/messageRepresentacion';

import {
  Box,
  Stack
} from '@mui/material';
import { useMainPage } from './useMainPage';

export function MainPage() {
  const {
    sideBarOpened,
    //tableOpened,
    messageSelected
  } = useMainPage();

  return (
    <Stack sx={{ height: '100%', overflow: 'hidden' }}>
      <Stack direction='row' sx={{ flex: 1, minHeight: 0, width: '100%' }}>
        {sideBarOpened}
        <Stack sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
          <Box sx={{
            flex: 1, minHeight: 0, minWidth: 0,
            overflow: 'hidden', display: 'flex',
            flexDirection: 'column',
            pr: '10px', pl: '10px', pt: '10px',
            width: '100%'
          }}>
            {"tableOpened"}
          </Box>
        </Stack>
      </Stack>
      {messageSelected && <MessageDetail />}
    </Stack>
  );
}
