import { Send, Mail, Hub, Settings } from '@mui/icons-material';
import type { NavItemConfig } from '../types/navigation.types';

export const DRAWER_WIDTH = 60;

const style = { fontSize: 30 };

export const OVERLAY_IDS = {
  NAV_SUBSCRIPTION:   'nav/subscription',
  NAV_PUBLISH:        'nav/publish',
  NAV_BROKER:         'nav/broker',
  NAV_CONFIG:         'nav/configuration'
};

export const NAV_ITEMS_CONFIG: NavItemConfig[] = [
  { id: 1, label: 'subcription',      icon: <Mail sx={style} />,      overlayId: OVERLAY_IDS.NAV_SUBSCRIPTION },
  { id: 2, label: 'publish',          icon: <Send sx={style} />,      overlayId: OVERLAY_IDS.NAV_PUBLISH},
  { id: 3, label: 'Broker',           icon: <Hub sx={style} />,       overlayId: OVERLAY_IDS.NAV_BROKER},
  { id: 4, label: 'Configuration',    icon: <Settings sx={style} />,  overlayId: OVERLAY_IDS.NAV_CONFIG}
];
