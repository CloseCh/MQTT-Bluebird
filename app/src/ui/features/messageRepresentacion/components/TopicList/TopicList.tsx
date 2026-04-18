import React from 'react';
import TopicListItem from "./TopicListItem/TopicListItem.js";
import List from '@mui/material/List';
import { useMQTTContext } from '../../hooks/useMQTTContext.js';

import type { Topic, TopicList } from '../../types/mqtt.types.js';
import { useSubscriptionContext } from '@/features/messageSubscription/index.js';
import { filterBySubscriptions } from '@/shared/service/topicFilter.js';

interface MQTTListProps {

}

function TopicList({ }: MQTTListProps) {
  const { topicList } = useMQTTContext();
  const { subscriptionList } = useSubscriptionContext();

  const selectedSubscription = Object.keys(subscriptionList).filter(key => subscriptionList[key]);

  const filteredTopicList = filterBySubscriptions(topicList, selectedSubscription);

  return (
    <List sx={{ width: '100%' }}>
      {filteredTopicList.map((topic: Topic) => (
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