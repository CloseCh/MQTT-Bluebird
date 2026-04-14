import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface Prop {
  labelId: string;
  index: number;
  value: string;
  checked: number[];
  handleToggle: (value: number) => void;
}

export function SubscriptionListItem({ labelId, index, value, checked, handleToggle }: Prop) {
  return (
    <ListItem
      key={value}
      disablePadding
    >
      <ListItemButton role={undefined} onClick={() => handleToggle(index)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.includes(index)}
            tabIndex={-1}
            disableRipple
            slotProps={{ input: { 'aria-labelledby': labelId } }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`${value}`} />
      </ListItemButton>
    </ListItem>
  );
}