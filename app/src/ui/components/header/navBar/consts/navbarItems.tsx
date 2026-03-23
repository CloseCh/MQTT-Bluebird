import type { ReactElement } from 'react';

import SubscriptionsIcon from '@mui/icons-material/Subscript';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import HomeIcon from '@mui/icons-material/Home';

interface navbarItem {
  id: number
  icon: ReactElement
  label: string
  route: string
}

export const navbarItems: navbarItem[] = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Main',
    route: 'main',
  },
  {
    id: 1,
    icon: <SubscriptionsIcon />,
    label: 'Subscription',
    route: 'subscription',
  },
  {
    id: 2,
    icon: <PostAddIcon />,
    label: 'Publish',
    route: 'publish',
  },
  {
    id: 3,
    icon: <PrecisionManufacturingIcon />,
    label: 'Configuration',
    route: 'configuration',
  }
]