import React from 'react';
import TopicListItem from "./TopicListItem/TopicListItem.js";
import List from '@mui/material/List';
import { useMQTTContext } from '../../hooks/useMQTTContext.js';

import type { Topic, TopicList } from '../../types/mqtt.types.js';

interface MQTTListProps {

}

function TopicList({ }: MQTTListProps) {
  const { topicList } = useMQTTContext();

  return (
    <List sx={{ width: '100%' }}>
      {topicList.map((topic: Topic) => (
        <TopicListItem
          key={topic}
          topic={topic}
        />
      ))}
    </List>
  );
}

const TopicListMemo = React.memo(TopicList);

export { TopicListMemo as TopicList }