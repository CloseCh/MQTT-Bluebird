import { useState, useCallback } from "react";
import { HEADER_HEIGHT } from "../../../../constants/layout.js";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import MessageDetailData from "./MessageDetailData/MessageDetailData.js";
import ResizeHandle from "./ResizeHandle/ResizeHandle.jsx";
import type { Topic, MessageFormatEnum } from "../../types/mqtt.types.js";
import { useMQTTContext } from "../../hooks/useMQTTContext.js";

interface Prop {
  handleClick: () => void;
  messageSelected: MQTTMessage;
  selectedTopic: Topic;
}

function MessageDetail ({ messageSelected, selectedTopic, handleClick }: Prop) {
  const [drawerWidth, setDrawerWidth] = useState(400);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = drawerWidth;

    const onMouseMove = (e: MouseEvent) => {
      const delta = startX - e.clientX;
      const newWidth = Math.min(Math.max(startWidth + delta, 200), 800);
      setDrawerWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [drawerWidth]);

  const { getMessageFormat } = useMQTTContext();

  const messageFormat: MessageFormatEnum = getMessageFormat(selectedTopic);
  
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

export { MessageDetail };