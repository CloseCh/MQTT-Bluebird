import {
  Dashboard,
  Send,
  RssFeed
} from "@mui/icons-material"

export const DRAWER_WIDTH = 60;

const style = {
  fontSize: 30
}

export const navItems = [
  { id: 1, label: 'subcription', icon: <RssFeed sx={style}/> },
  { id: 2, label: 'publish', icon: <Send sx={style}/>, dividerAfter: true },
  { id: 3, label: 'dashboarConfig', icon: <Dashboard sx={style}/> }
]