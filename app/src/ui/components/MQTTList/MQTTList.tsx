import React from 'react';
import MQTTListItem from "./MQTTListItem.jsx";
import List from '@mui/material/List';

interface MQTTListProps {
  handleClick: (topic: string) => void;
  topics: string[];
  selectedTopic: string;
}

function MQTTList({ handleClick, topics, selectedTopic }: MQTTListProps) {
  return (
    <List sx={{ width: '100%' }}>
      {topics.map((topic: string) => (
        <MQTTListItem
          key={topic}
          topic={topic}
          handleClick={handleClick}
          selected={topic===selectedTopic}
        />
      ))}
    </List>
  );
}

export default React.memo(MQTTList);