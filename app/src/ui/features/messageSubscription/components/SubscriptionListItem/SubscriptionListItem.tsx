import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { useSubscriptionContext } from "../../hooks/useSubscriptionContext";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Prop {
  labelId: string;
  index: number;
  value: string;
  checked: number[];
  handleToggle: (value: number) => void;
}

export function SubscriptionListItem({ labelId, index, value, checked, handleToggle }: Prop) {

  const { unsubscribe } = useSubscriptionContext();

  function handleClick(value: string) {
    unsubscribe([value]);
  }

  return (
    <ListItem
      key={value}
      sx={{
        pl: "10px"
      }}
    >
      <Checkbox
        edge="start"
        checked={checked.includes(index)}
        onClick={() => handleToggle(index)}
        tabIndex={-1}
        slotProps={{ input: { 'aria-labelledby': labelId } }}
      />
      <ListItemText id={labelId} primary={`${value}`} />
      <IconButton type="button" aria-label="Add" onClick={() => handleClick(value)}>
        <DeleteOutlineIcon />
      </IconButton>
    </ListItem>
  );
}