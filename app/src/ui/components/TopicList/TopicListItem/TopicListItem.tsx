import React from 'react';
import { useCallback } from 'react';
import ListItemButton from '@mui/material/ListItemButton';

import MailIcon from '@mui/icons-material/Mail'

interface MQTTListItemProps {
  topic: string;
  handleClick: (topic: string) => void;
  selected: boolean;
}

function TopicListItem({ topic, handleClick, selected }: MQTTListItemProps) {
  const handleClickMemo = useCallback(() => {
    handleClick(topic);
  }, [topic, handleClick]);

  return (
    <ListItemButton
      onClick={handleClickMemo}
      selected={selected}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
          }
        }
      }}
    >
      <MailIcon sx={{ marginRight: '10px' }} />
      <span>{topic}</span>
    </ListItemButton>
  );
}

export default React.memo(TopicListItem);