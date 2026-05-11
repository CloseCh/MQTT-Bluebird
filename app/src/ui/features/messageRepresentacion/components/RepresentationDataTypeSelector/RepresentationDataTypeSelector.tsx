import { NestedMenuItem } from 'mui-nested-menu';
import {
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Menu
} from '@mui/material';

import { useRepresentationDataTypeSelector } from './useRepresentationDataTypeSelector';

import type { MessageFormatEnum } from '@/features/messageRepresentacion';

import { NUM_FORMATS, TEXT_FORMATS } from '../../constants/TypeSelector.constants';

export function RepresentationDataTypeSelector( ) {
  const {
    selectRef,
    messageFormat,
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleSelect
  } = useRepresentationDataTypeSelector();

  return (
    <>
      <FormControl fullWidth sx={{ minWidth: '200px' }} ref={selectRef}>
        <InputLabel id='label'>Message Format</InputLabel>
        <Select
          labelId='label'
          label='Message Format'
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

        <NestedMenuItem label='Texto' parentMenuOpen={open} sx={{ minWidth: '200px' }}>
          {TEXT_FORMATS.map((f: MessageFormatEnum) => (
            <MenuItem key={f} sx={{ minWidth: '200px' }} onClick={() => handleSelect(f)}>{f}</MenuItem>
          ))}
        </NestedMenuItem>

        <NestedMenuItem label='Numérico' parentMenuOpen={open} sx={{ minWidth: '200px' }}>
          {NUM_FORMATS.map((f: MessageFormatEnum) => (
            <MenuItem key={f} sx={{ minWidth: '200px' }} onClick={() => handleSelect(f)}>{f}</MenuItem>
          ))}
        </NestedMenuItem>
      </Menu>
    </>
  );
}

export default RepresentationDataTypeSelector;