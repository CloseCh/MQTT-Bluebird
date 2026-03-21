import type { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Prop {
  handleChange: (event: SelectChangeEvent) => void;
  messageFormat: MessageTypes;
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
        <MenuItem value={"ascii"}>Ascii</MenuItem>
        <MenuItem value={"hex"}>hex</MenuItem>
        <MenuItem value={"json"}>json</MenuItem>
        <MenuItem value={"utf8"}>utf8</MenuItem>
        <MenuItem value={"int8"}>int8</MenuItem>
        <MenuItem value={"uint8"}>uint8</MenuItem>
        <MenuItem value={"int16"}>int16</MenuItem>
        <MenuItem value={"uint16"}>uint16</MenuItem>
        <MenuItem value={"int32"}>int32</MenuItem>
        <MenuItem value={"uint32"}>uint32</MenuItem>
        <MenuItem value={"int64"}>int64</MenuItem>
        <MenuItem value={"uint64"}>uint64</MenuItem>
      </Select>
    </FormControl>
  );
}