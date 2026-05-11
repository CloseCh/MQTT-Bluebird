import { Topic , History, Timeline, Send, RssFeed } from '@mui/icons-material';
import type { NavItemConfig } from '../types/navigation.types';

export const DRAWER_WIDTH = 60;

const style = { fontSize: 30 };

export const OVERLAY_IDS = {
  NAV_SUBSCRIPTION:   'nav/subscription',
  NAV_PUBLISH:        'nav/publish',

  TABLE_HISTORY:      'table/history',
  TABLE_LAST:         'table/last',
  TABLE_TOPIC:        'table/topic'
};

export const NAV_ITEMS_CONFIG: NavItemConfig[] = [
  { id: 1, label: 'subcription',    icon: <RssFeed sx={style} />,   overlayId: OVERLAY_IDS.NAV_SUBSCRIPTION },
  { id: 2, label: 'publish',        icon: <Send sx={style} />,      overlayId: OVERLAY_IDS.NAV_PUBLISH, dividerAfter: true },
  { id: 3, label: 'history',        icon: <History sx={style} />, overlayId: OVERLAY_IDS.TABLE_HISTORY },
  { id: 4, label: 'topic',          icon: <Topic sx={style} />, overlayId: OVERLAY_IDS.TABLE_TOPIC },
  { id: 5, label: 'last',           icon: <Timeline sx={style} />, overlayId: OVERLAY_IDS.TABLE_LAST },
];
