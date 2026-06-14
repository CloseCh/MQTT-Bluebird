import List from '@mui/material/List';
import type { SubscriptionList } from '../../types/subscription.types';
import { useSubscriptionContext } from '../../context/SubscriptionProvider';
import { SubscriptionListItem } from './SubscriptionListItem/SubscriptionListItem';

export function SubscriptionList() {
  const { subscriptionList, updateSubscriptionState } = useSubscriptionContext();

  return (
    <List sx={{ width: '100%', overflowX: 'hidden' }}>
      {Object.entries(subscriptionList).map(([value, isChecked], index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <SubscriptionListItem
            key={index}
            labelId={labelId}
            value={value}
            checked={isChecked}
            handleToggle={updateSubscriptionState}
          />
        );
      })}
    </List>
  );
}

export default SubscriptionList;