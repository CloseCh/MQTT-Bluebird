import {
  Dataset,
  Publish,
  Subscriptions
} from "@mui/icons-material"

export const DRAWER_WIDTH = 60;

export const navItems = [
  { id: 1, label: 'Dashboard', icon: <Dataset sx={{ fontSize: 30 }}/> },
  { id: 2, label: 'Publish', icon: <Publish sx={{ fontSize: 30 }}/> },
  { id: 3, label: 'subscribe', icon: <Subscriptions sx={{ fontSize: 30 }}/> }
]