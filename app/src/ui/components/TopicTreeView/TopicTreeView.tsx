import { useMQTTContext } from '@/features/messageRepresentacion';
import { useSubscriptionContext } from '@/features/messageSubscription';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function TopicTreeView() {
  const {subscriptionList} = useSubscriptionContext();
  //const {topicList} = useMQTTContext();

  if (subscriptionList === undefined) {
    return <></>;
  }

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        {Object.entries(subscriptionList).map(([subscription, selected]) => {
          return <TreeItem itemId="subscription" label={subscription}> </TreeItem>;
        })}
      </SimpleTreeView>
    </Box>
  );
}