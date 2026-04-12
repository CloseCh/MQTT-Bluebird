import { Box } from "@mui/material";
import type { ReactElement } from "react";

interface Prop {
  showSidebar: boolean; 
  sidebarWidth: number;
  children: ReactElement;

}
export function SideBar({ showSidebar, sidebarWidth, children }: Prop) {
  return (
    <Box sx={{
      width: showSidebar ? sidebarWidth : 0,
      flexShrink: 0,
      height: '100%',
      overflow: 'hidden'
    }}
    >
      {children}
    </Box>
  );
} 