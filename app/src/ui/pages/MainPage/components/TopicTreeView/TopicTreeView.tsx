import { useMQTTContext } from '@/features/messageRepresentacion';
import { useSubscriptionContext } from '@/features/messageSubscription';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useCallback, useMemo } from 'react';
import type { TopicNode } from './types/tree.type';
import { buildTree } from './utils/treeInstanciation.util';

function renderTopicNode(
  node: TopicNode,
  idPath: string,
  onSelectTopic: (topic: string) => void
) {
  const children = node.children ? [...node.children.values()] : [];
  const isLeaf = children.length === 0;
  const label = isLeaf ? node.fullPath ?? node.label : node.label;

  return (
    <TreeItem
      key={idPath}
      itemId={idPath}
      label={label}
      onClick={isLeaf && node.fullPath ? () => onSelectTopic(node.fullPath!) : undefined}
    >
      {children.map((child) =>
        renderTopicNode(child, `${idPath}/${child.label}`, onSelectTopic)
      )}
    </TreeItem>
  );
}

export default function TopicTreeView() {
  const { subscriptionList } = useSubscriptionContext();
  const { topicList, setSelectedTopic } = useMQTTContext();

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
        {[...tree.children.values()].map((subscriptionNode) => {
          const subscriptionId = `subscription::${subscriptionNode.suscription}`;
          const topics = subscriptionNode.children
            ? [...subscriptionNode.children.values()]
            : [];

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
