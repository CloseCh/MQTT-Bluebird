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
import { type MessageTypes } from '../../constants/types.js';

interface Prop {
  handleClick: () => void;
  selectedMessage: string;
  message: MQTTMessage;
  messageFormat: MessageTypes;
  setMessageFormat: (topic: string, format: MessageTypes) => void;
}

export default function MQTTDetailed ({ handleClick, selectedMessage, message, messageFormat, setMessageFormat}: Prop) {
  const handleChange = (event: SelectChangeEvent) => {
    const newFormat = event.target.value as MessageTypes;
    setMessageFormat(message.topic, newFormat);
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
              <MQTTDetailedSelector 
                handleChange={handleChange} 
                messageFormat={messageFormat} 
              />
            </Box>
          </Stack>
        </Grid>
        <Grid size={12}>
          <MQTTDetailedMessageData message={message} messageFormat={messageFormat}/>
        </Grid>
        <Grid size={12}>
        </Grid>
      </Grid>
    </Drawer>
  );
}