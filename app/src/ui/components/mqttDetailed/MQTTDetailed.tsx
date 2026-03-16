import { useState } from "react";
import { HEADER_HEIGHT } from "../../constants/layout.js";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MQTTDetailedMessageData from "./MQTTDetailedMessageData.jsx";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MQTTDetailedSelector from "./MQTTDetailedSelector.jsx";
import type { SelectChangeEvent } from "@mui/material/Select";

interface prop {
  handleClick: () => void
  selectedMessage: string
  message: MQTTMessage
}

export default function MQTTDetailed ({ handleClick, selectedMessage, message }: prop) {
  const [messageType, setMessageType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMessageType(event.target.value as string);
  };
  
  return (
    <Drawer
      variant={"persistent"}
      anchor="right"
      open={selectedMessage != ""}
      sx={{
        '& .MuiDrawer-paper': {
          top: `${HEADER_HEIGHT}px`,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          width: '400px',
        }
      }}
    >
      <Grid 
        container
      >

        <Grid size={12}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ padding: '20px 20px 0px 20px'}}>
            <IconButton onClick={handleClick}> <KeyboardDoubleArrowRightIcon/> </IconButton>
            <Box sx={{ flex: 1 }}>
              <MQTTDetailedSelector messageType={messageType} handleChange={handleChange}/>
            </Box>
          </Stack>
        </Grid>
        <Grid size={12}>
          <MQTTDetailedMessageData message={message}/>
        </Grid>
        <Grid size={12}>
        </Grid>
      </Grid>
    </Drawer>
  );
}