import React from 'react';
import MQTTListItem from "./MQTTListItem.js";
import List from '@mui/material/List';

interface MQTTListProps {
  handleClick: (topic: string) => void;
  topics: string[]
}

function MQTTList({ handleClick, topics }: MQTTListProps) {
    return (
        <List sx={{ width: '100%' }}>
            {topics.map((topic: string) => (
                <MQTTListItem
                    key={topic}
                    topic={topic}
                    handleClick={handleClick}
                />
            ))}
        </List>
    );
}

export default React.memo(MQTTList);