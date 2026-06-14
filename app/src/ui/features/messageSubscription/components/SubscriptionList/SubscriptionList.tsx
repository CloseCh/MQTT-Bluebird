import List from '@mui/material/List';
import { useSubscriptionContext } from '../../context/SubscriptionProvider';
import { SubscriptionListItem } from './SubscriptionListItem/SubscriptionListItem';

export function SubscriptionList() {
  const { subscriptionList, updateSubscriptionState } = useSubscriptionContext();

  return (
    <List sx={{ width: '100%', overflowX: 'hidden' }}>
      {Object.values(subscriptionList).map((subscription) => (
        <SubscriptionListItem
          key={subscription.topic}
          subscription={subscription}
          handleToggle={updateSubscriptionState}
        />
      ))}
    </List>
  );
}

export default SubscriptionList;
