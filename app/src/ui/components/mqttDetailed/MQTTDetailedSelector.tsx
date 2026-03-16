import type { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Prop {
  messageType: string
  handleChange: (event: SelectChangeEvent) => void
}

export default function MQTTDetailedSelector ({ messageType, handleChange}: Prop) {
  return (
    <FormControl fullWidth>
      <InputLabel id="label">Message Type</InputLabel>
      <Select
        labelId="label"
        id="detailed-select"
        value={messageType}
        label="MessageType"
        onChange={handleChange}
      >
        <MenuItem value={10}>String</MenuItem>
        <MenuItem value={20}>Number</MenuItem>
        <MenuItem value={30}>Json</MenuItem>
      </Select>
    </FormControl>
  );
}