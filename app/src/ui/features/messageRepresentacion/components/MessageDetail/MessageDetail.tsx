import { useEffect } from "react";
import {Drawer, Grid} from "@mui/material";
import MessageDetailData from "./MessageDetailData/MessageDetailData";
import ResizeHandle from "./ResizeHandle/ResizeHandle";
import { useMessageDetail } from "./useMessageDetail";
import { HEADER_HEIGHT } from "../../../../constants/layout";

interface MessageDetailProp {
  handleClick: () => void;
  messageSelected: MQTTMessage;
}

export function MessageDetail ({ messageSelected, handleClick }: MessageDetailProp) {
  const {
    drawerWidth,
    handleMouseDown,
    messageFormat
  } = useMessageDetail();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && messageSelected != null) handleClick();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [messageSelected, handleClick]);

  return (
    <Drawer
      anchor="right"
      open={messageSelected != null}
      hideBackdrop
      disableScrollLock
      ModalProps={{
        disableEnforceFocus: true,
        disableAutoFocus: true,
        disableScrollLock: true,
        style: { pointerEvents: 'none' },
      }}
      sx={{
        '& .MuiDrawer-paper': {
          pointerEvents: 'auto',
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
          <MessageDetailData
            messageSelected={messageSelected}
            messageFormat={messageFormat}
            onClose={handleClick}
          />
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default MessageDetail;
