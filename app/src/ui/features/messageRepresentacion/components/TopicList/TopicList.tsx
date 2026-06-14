import React from 'react';
import TopicListItem from './TopicListItem/TopicListItem';
import List from '@mui/material/List';
import { useRepresentationContext } from '../../context/RepresentationProvider';

import type { Topic, TopicList } from '../../types/mqtt.types';
import { useSubscriptionContext } from '@/features/messageSubscription/index';
import { filterBySubscriptions } from '@/shared/service/topicFilter';

function TopicList() {
  const { topicList } = useRepresentationContext();
  const { getSelectedSubscriptions } = useSubscriptionContext();

  const selectedSubscription = getSelectedSubscriptions();

  const filteredTopicList = filterBySubscriptions(topicList, selectedSubscription);

  return (
    <List sx={{ width: '100%', overflowX: 'hidden' }}>
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