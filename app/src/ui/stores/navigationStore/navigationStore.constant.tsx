import type { NavItemConfig } from '@/features/navigation';
import { Send, Mail, Hub, Settings } from '@mui/icons-material';

export const DRAWER_WIDTH = 60;

const style = { fontSize: 30 };

export const OVERLAY_IDS = {
  NAV_SUBSCRIPTION:   'nav/subscription',
  NAV_PUBLISH:        'nav/publish',
  NAV_BROKER:         'nav/broker',
  NAV_CONFIG:         'nav/configuration'
};

export const ROUTES = {
  MAIN:    '/',
  MONITOR: '/monitor',
  SETTINGS:'/settings',
};

export const NAV_ITEMS_CONFIG: NavItemConfig[] = [
  { id: 1, label: 'Subcription',      icon: <Mail sx={style} />,      overlayId: OVERLAY_IDS.NAV_SUBSCRIPTION,  route: ROUTES.MAIN },
  { id: 2, label: 'Publish',          icon: <Send sx={style} />,      overlayId: OVERLAY_IDS.NAV_PUBLISH,       route: ROUTES.MAIN },
  { id: 3, label: 'Broker',           icon: <Hub sx={style} />,       overlayId: OVERLAY_IDS.NAV_BROKER,        route: ROUTES.MONITOR },
  { id: 4, label: 'Configuration',    icon: <Settings sx={style} />,  overlayId: OVERLAY_IDS.NAV_CONFIG,        route: ROUTES.SETTINGS }
];
