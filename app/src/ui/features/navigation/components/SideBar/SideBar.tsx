import { Box } from "@mui/material";
import { useState } from "react";
import type { ReactElement } from "react";
import { ResizeHandle } from "./ResizeHandle/ResizeHandle";
import { useOverlayStore } from "@/stores/overlayStore";
import { NAV_ITEMS_CONFIG } from "../../constants/navbarConstants";

interface Prop {
  children: ReactElement;
}

export function SideBar({ children }: Prop) {
  const [sidebarWidth, setSidebarWidth] = useState(200);

  const overlays = useOverlayStore(s => s.overlays);
  const showSidebar = NAV_ITEMS_CONFIG.some(item => overlays[item.overlayId] ?? false);

  return (
    <>
      <Box sx={{
        width: showSidebar ? sidebarWidth : 0,
        flexShrink: 0,
        height: '100%',
        overflow: 'hidden'
      }}>
        {children}
      </Box>
      {showSidebar
        ? <ResizeHandle initialSize={sidebarWidth} onResize={setSidebarWidth} min={100} max={500} />
        : <></>
      }
    </>
  );
}