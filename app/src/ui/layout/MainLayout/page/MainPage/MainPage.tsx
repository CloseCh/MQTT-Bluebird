import { RepresentationDataTypeSelector, MessageDetail } from "@/features/messageRepresentacion";

import {
  Box,
  Stack
} from "@mui/material";
import { useMainPage } from "./useMainPage";

export default function MainPage() {
  const {
    sideBarOpened,
    selectedTopic,
    messageSelected,
    tableOpened,
    handleCloseDetailedClick
  } = useMainPage();

  return (
    <>
      <Stack direction="row" sx={{ flex: 1, minHeight: 0, width: '100%' }}>
        {sideBarOpened}
        <Stack sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
          <Stack direction="row" sx={{ minHeight: 0, minWidth: 0, padding: '10px 10px 10px 10px' }}>
            <Box>
              <RepresentationDataTypeSelector selectedTopic={selectedTopic} />
            </Box>
          </Stack>
          <Box sx={{
            flex: 1, minHeight: 0, minWidth: 0,
            overflow: 'hidden', display: 'flex',
            flexDirection: 'column',
            pr: '10px', pl: '10px',
            width: '100%'
          }}>
            {tableOpened}
          </Box>
        </Stack>
      </Stack>
      {messageSelected
        ? <MessageDetail messageSelected={messageSelected} selectedTopic={selectedTopic} handleClick={handleCloseDetailedClick} />
        : <></>
      }
    </>
  );
}
