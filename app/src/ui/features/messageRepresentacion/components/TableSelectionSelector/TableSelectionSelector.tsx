import { useCallback, useRef, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Menu } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useMQTTContext } from '../../hooks/useMQTTContext';
import type { TableType } from '../../types/mqtt.types';
import { TABLE_OPTIONS } from '../../constants/TypeSelector.constants';

interface TableSelectionSelectorProp {
  styleProp: SxProps<Theme>
}

export function TableSelectionSelector({styleProp}: TableSelectionSelectorProp) {
  const { tableType, setTableType } = useMQTTContext();
  const selectRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(selectRef.current);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSelect = useCallback((type: TableType) => {
    setTableType(type);
    handleClose();
  }, [setTableType, handleClose]);

  const selectedLabel = TABLE_OPTIONS.find(o => o.type === tableType)?.label ?? '';

  return (
    <Box sx={styleProp}>
      <FormControl fullWidth ref={selectRef}>
        <InputLabel id='table-label' size='small'>Table</InputLabel>
        <Select
          labelId='table-label'
          label='Modo'
          value={tableType}
          open={false}
          onClick={handleOpen}
          readOnly
          size='small'
        >
          <MenuItem value={tableType}>{selectedLabel}</MenuItem>
        </Select>
      </FormControl>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: { minWidth: selectRef.current?.offsetWidth },
          },
        }}
        disableRestoreFocus={false}
      >
        {TABLE_OPTIONS.map(({ type, label }) => (
          <MenuItem key={type} onClick={() => handleSelect(type)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
