import { useState } from 'react';
import List from '@mui/material/List';
import type { SubscriptionList } from '../../types/subscription.types';
import { useSubscriptionContext } from '../../hooks/useSubscriptionContext';
import { SubscriptionListItem } from '../SubscriptionListItem/SubscriptionListItem';

interface Prop {
}

export function SubscriptionList({ }: Prop) {
  const [checked, setChecked] = useState([0]);

  const { subscriptionList } = useSubscriptionContext();

  function handleToggle(value: number) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {subscriptionList.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <SubscriptionListItem
            labelId={labelId}
            value={value}
            index={index}
            checked={checked}
            handleToggle={handleToggle}
          />
        );
      })}
    </List>
  );
}

export default SubscriptionList;