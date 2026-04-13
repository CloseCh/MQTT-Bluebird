import { Box } from "@mui/material";
import { useState, type ReactElement } from "react";
import { ResizeHandle } from "./ResizeHandle/ResizeHandle";

interface Prop {
  showSidebar: boolean;
  children: ReactElement;
}

export function SideBar({ showSidebar, children }: Prop) {
  const [sidebarWidth, setSidebarWidth] = useState(200);

  return (
    <>
      <Box sx={{
        width: showSidebar ? sidebarWidth : 0,
        flexShrink: 0,
        height: '100%',
        overflow: 'hidden'
      }}
      >
        {children}
      </Box>
      {showSidebar ?
        <ResizeHandle
          initialSize={sidebarWidth}
          onResize={setSidebarWidth}
          min={100}
          max={500}
        />
        : <></>
      }
    </>
  );
} 