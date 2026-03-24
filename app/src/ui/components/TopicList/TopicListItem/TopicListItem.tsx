import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import MailIcon from '@mui/icons-material/Mail'

import type { Topic } from '../../../types/mqtt.types';
import { useMQTTContext } from '../../../hooks/useMQTTContext/useMQTTContext';

interface MQTTListItemProps {
  topic: Topic;
}

function TopicListItem({ topic }: MQTTListItemProps) {
  const { getSelectedTopic, setSelectedTopic } = useMQTTContext();

  return (
    <ListItemButton
      onClick={() => setSelectedTopic(topic)}
      selected={getSelectedTopic() === topic}
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