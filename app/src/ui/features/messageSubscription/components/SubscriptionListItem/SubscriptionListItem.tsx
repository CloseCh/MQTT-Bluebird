import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { useSubscriptionContext } from "../../hooks/useSubscriptionContext";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Prop {
  labelId: string;
  value: string;
  checked: boolean;
  handleToggle: (value: string) => void;
}

export function SubscriptionListItem({ labelId, value, checked, handleToggle }: Prop) {

  const { unsubscribe } = useSubscriptionContext();

  return (
    <ListItem
      key={value}
      sx={{
        width: "100%"
      }}
    >
      <Checkbox
        edge="start"
        checked={checked}
        onClick={() => handleToggle(value)}
        tabIndex={-1}
        slotProps={{ input: { 'aria-labelledby': labelId } }}
      />
      <ListItemText id={labelId} primary={`${value}`} />
      <IconButton type="button" aria-label="Add" onClick={() => unsubscribe(value)} edge="end">
        <DeleteOutlineIcon />
      </IconButton>
    </ListItem>
  );
}