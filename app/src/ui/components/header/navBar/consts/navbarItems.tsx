import type { ReactElement } from 'react';

import SubscriptionsIcon from '@mui/icons-material/subscriptions';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

interface navbarItem {
    id: number
    icon: ReactElement
    label: string
    route: string
}

export const navbarItems: navbarItem[] = [
    {
        id: 0,
        icon: <SubscriptionsIcon />,
        label: 'Subscription',
        route: 'subscription',
    },
    {
        id: 1,
        icon: <PostAddIcon />,
        label: 'Post',
        route: 'post',
    },
    {
        id: 2,
        icon: <PrecisionManufacturingIcon />,
        label: 'Configuration',
        route: 'configuration',
    }
]