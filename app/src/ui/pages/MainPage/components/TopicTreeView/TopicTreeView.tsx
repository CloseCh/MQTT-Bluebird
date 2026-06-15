import { useRepresentationContext } from '@/features/messageRepresentacion';
import { useSubscriptionContext } from '@/features/messageSubscription';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useCallback, useMemo } from 'react';
import type { TopicNode } from './types/tree.type';
import { buildTree, orderByLabel } from './utils/treeInstanciation.util';

// Ordena alfabéticamente (numérico: topic/1, topic/2, topic/10).

function renderTopicNode(
  node: TopicNode,
  idPath: string,
  onSelectTopic: (topic: string) => void
) {
  const children = (node.children ? [...node.children.values()] : []).sort(orderByLabel);
  const isLeaf = children.length === 0;
  const label = isLeaf ? node.fullPath ?? node.label : node.label;
  const hasOwnData = !isLeaf && node.fullPath != null;

  return (
    <TreeItem
      key={idPath}
      itemId={idPath}
      label={label}
      onClick={isLeaf && node.fullPath ? () => onSelectTopic(node.fullPath!) : undefined}
    >
      {hasOwnData && (
        <TreeItem
          key={`${idPath}::self`}
          itemId={`${idPath}::self`}
          label={
            <Box component='span' sx={{ color: 'warning.main', fontWeight: 700 }}>
              {`● ${node.label} (este topic)`}
            </Box>
          }
          onClick={() => onSelectTopic(node.fullPath!)}
        />
      )}
      {children.map((child) =>
        renderTopicNode(child, `${idPath}/${child.label}`, onSelectTopic)
      )}
    </TreeItem>
  );
}

export default function TopicTreeView() {
  const { subscriptionList } = useSubscriptionContext();
  const { topicList, setSelectedTopic } = useRepresentationContext();

  const tree = useMemo(
    () => buildTree(subscriptionList, topicList),
    [subscriptionList, topicList]
  );

  const handleSelectTopic = useCallback(
    (topic: string) => {
      setSelectedTopic(topic);
    },
    [setSelectedTopic]
  );

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        {[...tree.children.values()]
          .sort((a, b) => a.suscription.localeCompare(b.suscription, undefined, { numeric: true }))
          .map((subscriptionNode) => {
          const subscriptionId = `subscription::${subscriptionNode.suscription}`;
          const topics = (subscriptionNode.children
            ? [...subscriptionNode.children.values()]
            : []).sort(orderByLabel);

          return (
            <TreeItem
              key={subscriptionId}
              itemId={subscriptionId}
              label={subscriptionNode.suscription}
            >
              {topics.map((topic) =>
                renderTopicNode(topic, `${subscriptionId}/${topic.label}`, handleSelectTopic)
              )}
            </TreeItem>
          );
        })}
      </SimpleTreeView>
    </Box>
  );
}
