import {
  DataObject,
  Send,
  Subscriptions
} from "@mui/icons-material"

export const DRAWER_WIDTH = 60;

const style = {
  fontSize: 30
}

export const navItems = [
  { id: 1, label: 'subcription', icon: <Subscriptions sx={style}/> },
  { id: 2, label: 'publish', icon: <Send sx={style}/> },
  { id: 3, label: 'dashboarConfig', icon: <DataObject sx={style}/> }
]