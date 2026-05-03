import { Dashboard, Send, RssFeed } from "@mui/icons-material";
import type { ReactNode } from "react";
import { OVERLAY_IDS } from "@/stores/overlayIds";

export const DRAWER_WIDTH = 60;

const style = { fontSize: 30 };

export interface NavItemConfig {
  id: number;
  label: string;
  icon: ReactNode;
  overlayId: string;
  dividerAfter?: boolean;
}

export const NAV_ITEMS_CONFIG: NavItemConfig[] = [
  { id: 1, label: "subcription",    icon: <RssFeed sx={style} />,  overlayId: OVERLAY_IDS.NAV_SUBSCRIPTION },
  { id: 2, label: "publish",        icon: <Send sx={style} />,     overlayId: OVERLAY_IDS.NAV_PUBLISH, dividerAfter: true },
  { id: 3, label: "dashboarConfig", icon: <Dashboard sx={style} />, overlayId: OVERLAY_IDS.NAV_DASHBOARD },
];
