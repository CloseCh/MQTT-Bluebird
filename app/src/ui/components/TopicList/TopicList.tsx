import React from 'react';
import MQTTListItem from "./TopicListItem/TopicListItem.js";
import List from '@mui/material/List';

interface MQTTListProps {
  handleClick: (topic: string) => void;
  topics: string[];
  selectedTopic: string;
}

function TopicList({ handleClick, topics, selectedTopic }: MQTTListProps) {
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

export default React.memo(TopicList);