import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';

import MailIcon from '@mui/icons-material/Mail'

interface MQTTListItemProps {
  topic: string;
  handleClick: (topic: string) => void;
}

const MQTTListItem = React.memo(({ topic, handleClick }: MQTTListItemProps) => {
  return (
    <ListItemButton onClick={() => handleClick(topic)}>
      <MailIcon sx={{marginRight: '10px'}}/>
      <span>{topic}</span>
    </ListItemButton>
  );
});

export default MQTTListItem;