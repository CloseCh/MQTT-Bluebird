import type { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Prop {
  handleChange: (event: SelectChangeEvent) => void;
  messageFormat: string;
}

export default function MQTTDetailedSelector ({ handleChange, messageFormat}: Prop) {
  return (
    <FormControl fullWidth>
      <InputLabel id="label">Message Type</InputLabel>
      <Select
        labelId="label"
        id="detailed-select"
        value={messageFormat}
        label="MessageType"
        onChange={handleChange}
      >
        <MenuItem value={"string"}>String</MenuItem>
        <MenuItem value={"number"}>Number</MenuItem>
        <MenuItem value={"json"}>Json</MenuItem>
      </Select>
    </FormControl>
  );
}