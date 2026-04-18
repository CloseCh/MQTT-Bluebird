import type { MessageFormatEnum, Topic } from '@/features/messageRepresentacion';
import { useMQTTContext } from '@/features/messageRepresentacion';
import { NestedMenuItem } from 'mui-nested-menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useRef, useState } from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';

interface Prop {
  selectedTopic: Topic;
}

function DataTypeSelector({ selectedTopic }: Prop) {
  const selectRef = useRef<HTMLDivElement>(null);

  const { setMessageFormat, getMessageFormat } = useMQTTContext();
  const messageFormat: MessageFormatEnum = getMessageFormat(selectedTopic);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(selectRef.current);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSelect = useCallback((format: MessageFormatEnum) => {
    setAnchorEl(null);
    setTimeout(() => {
      setMessageFormat(selectedTopic, format);
    }, 0);
  }, [selectedTopic, setMessageFormat]);

  return (
    <>
      <FormControl fullWidth sx={{ minWidth: '200px' }} ref={selectRef}>
        <InputLabel id="label">Message Format</InputLabel>
        <Select
          labelId="label"
          label="Message Format"
          value={messageFormat}
          open={false}
          onClick={handleOpen}
          readOnly
        >
          <MenuItem value={messageFormat}>{messageFormat}</MenuItem>
        </Select>
      </FormControl>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ minWidth: '200px' }} disableRestoreFocus={false}
      >

        <NestedMenuItem label="Texto" parentMenuOpen={open} sx={{ minWidth: '200px' }} >
          <MenuItem onClick={() => handleSelect("UTF-8")}>UTF-8</MenuItem>
          <MenuItem onClick={() => handleSelect("ASCIICode")}>ASCII</MenuItem>
          <MenuItem onClick={() => handleSelect("JSON")}>JSON</MenuItem>
          <MenuItem onClick={() => handleSelect("HEX")}>HEX</MenuItem>
        </NestedMenuItem>

        <NestedMenuItem label="Numérico" parentMenuOpen={open} sx={{ minWidth: '200px' }} >
          <MenuItem onClick={() => handleSelect("int8")}>int8</MenuItem>
          <MenuItem onClick={() => handleSelect("uint8")}>uint8</MenuItem>
          <MenuItem onClick={() => handleSelect("int16")}>int16</MenuItem>
          <MenuItem onClick={() => handleSelect("uint16")}>uint16</MenuItem>
          <MenuItem onClick={() => handleSelect("int32")}>int32</MenuItem>
          <MenuItem onClick={() => handleSelect("uint32")}>uint32</MenuItem>
          <MenuItem onClick={() => handleSelect("int64")}>int64</MenuItem>
          <MenuItem onClick={() => handleSelect("uint64")}>uint64</MenuItem>
        </NestedMenuItem>

      </Menu>
    </>
  );
}

export { DataTypeSelector };