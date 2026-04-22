import type { MessageFormatEnum, Topic } from '@/features/messageRepresentacion';
import { useMQTTContext } from '@/features/messageRepresentacion';
import { NestedMenuItem } from 'mui-nested-menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useRef, useState } from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import { NUM_FORMATS, TEXT_FORMATS } from '../../constants';

interface Prop {
  selectedTopic: Topic;
}

function PublishDataTypeSelector({ selectedTopic }: Prop) {
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

        <NestedMenuItem label="Texto" parentMenuOpen={open} sx={{ minWidth: '200px' }}>
          {TEXT_FORMATS.map((f: MessageFormatEnum) => (
            <MenuItem key={f} sx={{ minWidth: '200px' }} onClick={() => handleSelect(f)}>{f}</MenuItem>
          ))}
        </NestedMenuItem>

        <NestedMenuItem label="Numérico" parentMenuOpen={open} sx={{ minWidth: '200px' }}>
          {NUM_FORMATS.map((f: MessageFormatEnum) => (
            <MenuItem key={f} sx={{ minWidth: '200px' }} onClick={() => handleSelect(f)}>{f}</MenuItem>
          ))}
        </NestedMenuItem>
      </Menu>
    </>
  );
}

export { PublishDataTypeSelector };