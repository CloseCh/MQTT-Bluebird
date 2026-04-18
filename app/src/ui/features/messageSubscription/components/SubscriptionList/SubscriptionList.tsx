import List from '@mui/material/List';
import type { SubscriptionList } from '../../types/subscription.types';
import { useSubscriptionContext } from '../../hooks/useSubscriptionContext';
import { SubscriptionListItem } from '../SubscriptionListItem/SubscriptionListItem';

interface Prop {
}

export function SubscriptionList({ }: Prop) {
  const { subscriptionList, updateSubscriptionState } = useSubscriptionContext();

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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