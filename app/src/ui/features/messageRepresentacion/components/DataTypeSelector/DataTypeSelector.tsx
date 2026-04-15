import type { MessageFormatEnum, Topic } from '@/features/messageRepresentacion';
import { useMQTTContext } from '@/features/messageRepresentacion';
import { NestedMenuItem } from 'mui-nested-menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';

interface Prop {
  selectedTopic: Topic;
}

function DataTypeSelector({ selectedTopic }: Prop) {
  const { setMessageFormat, getMessageFormat } = useMQTTContext();
  const messageFormat: MessageFormatEnum = getMessageFormat(selectedTopic);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelect(format: MessageFormatEnum) {
    setMessageFormat(selectedTopic, format);
    handleClose();
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {messageFormat ?? 'Message Format'}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>

        <NestedMenuItem label="Texto" parentMenuOpen={open}>
          <MenuItem onClick={() => handleSelect("utf8")}>UTF-8</MenuItem>
          <MenuItem onClick={() => handleSelect("asciiCode")}>ASCII</MenuItem>
          <MenuItem onClick={() => handleSelect("json")}>JSON</MenuItem>
          <MenuItem onClick={() => handleSelect("hex")}>HEX</MenuItem>
        </NestedMenuItem>

        <NestedMenuItem label="Numérico" parentMenuOpen={open}>
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