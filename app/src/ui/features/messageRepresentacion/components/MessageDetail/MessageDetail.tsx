import {Drawer, Grid} from "@mui/material";
import MessageDetailData from "./MessageDetailData/MessageDetailData";
import ResizeHandle from "./ResizeHandle/ResizeHandle";
import type { Topic } from "../../types/mqtt.types";
import { useMessageDetail } from "./useMessageDetail";
import { HEADER_HEIGHT } from "../../../../constants/layout";

interface Prop {
  handleClick: () => void;
  messageSelected: MQTTMessage;
  selectedTopic: Topic;
}

export function MessageDetail ({ messageSelected, selectedTopic, handleClick }: Prop) {
  const {
    drawerWidth,
    handleMouseDown,
    messageFormat
  } = useMessageDetail({selectedTopic});
  
  return (
    <Drawer
      anchor="right"
      open={messageSelected != null}
      onClose={handleClick}
      sx={{
        '& .MuiDrawer-paper': {
          top: `${HEADER_HEIGHT}px`,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          width: `${drawerWidth}px`,
          overflow: 'visible',
        }
      }}
    >
      <ResizeHandle onMouseDown={handleMouseDown} />

      <Grid container>
        <Grid size={12}>
          <MessageDetailData messageSelected={messageSelected} messageFormat={messageFormat}/>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default MessageDetail;