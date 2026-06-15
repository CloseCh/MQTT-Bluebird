import type { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import type { TreeRoot } from '../../types/tree.type';

interface Props {
  tree: TreeRoot;
  onSubscriptionContextMenu: (e: MouseEvent, topic: string) => void;
  isChecked: (subscription: string) => boolean;
  onToggle: (subscription: string) => void;
}

export default function TopicTree({
  tree,
  onSubscriptionContextMenu,
  isChecked,
  onToggle,
}: Props) {
  return (
    <SimpleTreeView>
      {[...tree.children.values()]
        .sort((a, b) => a.suscription.localeCompare(b.suscription, undefined, { numeric: true }))
        .map((subscriptionNode) => {
          const subscriptionId = `subscription::${subscriptionNode.suscription}`;
          return (
            <TreeItem
              key={subscriptionId}
              itemId={subscriptionId}
              label={
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                  onContextMenu={(e) => onSubscriptionContextMenu(e, subscriptionNode.suscription)}
                >
                  <Checkbox
                    size='small'
                    checked={isChecked(subscriptionNode.suscription)}
                    onChange={() => onToggle(subscriptionNode.suscription)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {subscriptionNode.suscription}
                </Box>
              }
            />
          );
        })}
    </SimpleTreeView>
  );
}
