import { ListItemIcon, Menu, MenuItem } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { ContextMenuState } from "../../types/tree.type";

interface LeftClickMenuProp {
  menu: ContextMenuState | null;
  closeMenu: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function LeftClickMenu({menu, closeMenu, handleEdit, handleDelete}: LeftClickMenuProp) {
  return (
    <Menu
        open={menu !== null}
        onClose={closeMenu}
        anchorReference='anchorPosition'
        anchorPosition={menu ? { top: menu.mouseY, left: menu.mouseX } : undefined}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize='small' />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      </Menu>
  );
}