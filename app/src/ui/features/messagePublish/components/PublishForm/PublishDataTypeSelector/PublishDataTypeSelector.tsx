import type { MessageFormatEnum } from '@/features/messageRepresentacion';
import { NestedMenuItem } from 'mui-nested-menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useRef, useState } from 'react';
import { Box, FormControl, InputLabel, Select } from '@mui/material';
import { NUM_FORMATS, TEXT_FORMATS } from '../../../constants';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

function PublishDataTypeSelector({ value = '', onChange }: Props) {
  const selectRef = useRef<HTMLDivElement>(null);
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
    onChange?.(format);
    handleClose();
  }, [onChange, handleClose]);

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth  ref={selectRef}>
        <InputLabel id='label' size='small'>Message Format</InputLabel>
        <Select
          labelId='label'
          label='Message Format'
          value={value}
          open={false}
          onClick={handleOpen}
          readOnly
          size='small'
        >
          <MenuItem value='' >{''}</MenuItem>
          {value && <MenuItem value={value}>{value}</MenuItem>}
        </Select>
      </FormControl>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper:{
            style: {
              width: selectRef.current?.offsetWidth,
            },
          }
        }}

        disableRestoreFocus={false}
      >
        <NestedMenuItem label='Texto' parentMenuOpen={open} sx={{ width: '100%' }}>
          {TEXT_FORMATS.map((f: MessageFormatEnum) => (
            <MenuItem key={f} sx={{ minWidth: '200px' }} onClick={() => handleSelect(f)}>
              {f}
            </MenuItem>
          ))}
        </NestedMenuItem>
        <NestedMenuItem label='Numérico' parentMenuOpen={open} sx={{ width: '100%' }}>
          {NUM_FORMATS.map((f: MessageFormatEnum) => (
            <MenuItem key={f} sx={{ minWidth: '200px' }} onClick={() => handleSelect(f)}>
              {f}
            </MenuItem>
          ))}
        </NestedMenuItem>
      </Menu>
    </Box>
  );
}

export { PublishDataTypeSelector };