import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';

import type { Topic } from '../../../types/mqtt.types';
import { useRepresentationContext } from '../../../context/RepresentationProvider';

interface MQTTListItemProps {
  topic: Topic;
}

function TopicListItem({ 
  topic
}: MQTTListItemProps) {
  const { getSelectedTopic, setSelectedTopic } = useRepresentationContext();

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
      <span>{topic}</span>
    </ListItemButton>
  );
}

export default React.memo(TopicListItem);