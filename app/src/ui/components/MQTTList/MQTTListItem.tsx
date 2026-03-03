import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';

import MailIcon from '@mui/icons-material/Mail'

type MQTTListItemProps = {
  topic: string;
}

const MQTTListItem = React.memo(({ topic }: MQTTListItemProps) => {
  return (
    <ListItemButton>
      <MailIcon sx={{marginRight: '10px'}}/>
      <span>{topic}</span>
    </ListItemButton>
  );
});

export default MQTTListItem;