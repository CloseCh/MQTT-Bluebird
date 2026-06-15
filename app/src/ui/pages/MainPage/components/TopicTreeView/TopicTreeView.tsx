import { useCallback, useMemo, useState } from 'react';
import { useRepresentationContext } from '@/features/messageRepresentacion';
import { useSubscriptionContext, SubscriptionModal } from '@/features/messageSubscription';

import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import type { ContextMenuState, TopicNode } from './types/tree.type';

import { buildTree, orderByLabel } from './utils/treeInstanciation.util';
import { topicMatchesSubscription } from './utils/treeSearch.util';

import DeleteSuscriptionDialog from './component/DeleteSuscriptionDialog/DeleteSuscriptionDialog';
import LeftClickMenu from './component/LeftClickMenu/LeftClickMenu';

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
  const { subscriptionList, unsubscribe } = useSubscriptionContext();
  const { topicList, setSelectedTopic, removeTopics } = useRepresentationContext();

  const [menu, setMenu] = useState<ContextMenuState | null>(null);
  // Topic de la suscripción que se está editando (null = modal cerrado).
  const [editTopic, setEditTopic] = useState<string | null>(null);
  // Topic pendiente de confirmar su eliminación (null = diálogo cerrado).
  const [deleteTopic, setDeleteTopic] = useState<string | null>(null);

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

  const handleContextMenu = useCallback((e: React.MouseEvent, topic: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({ mouseX: e.clientX, mouseY: e.clientY, topic });
  }, []);

  const closeMenu = useCallback(() => setMenu(null), []);

  const handleEdit = useCallback(() => {
    if (menu) setEditTopic(menu.topic);
    closeMenu();
  }, [menu, closeMenu]);

  const handleDelete = useCallback(() => {
    if (menu) setDeleteTopic(menu.topic);
    closeMenu();
  }, [menu, closeMenu]);

  const confirmDelete = useCallback(() => {
    if (deleteTopic) {
      void unsubscribe(deleteTopic);
      // Elimina los datos de los topics que cubría esta suscripción y que ya
      // no quedan cubiertos por ninguna otra suscripción activa.
      const remainingSubs = Object.keys(subscriptionList).filter((s) => s !== deleteTopic);
      const orphanTopics = topicList.filter(
        (topic) =>
          topicMatchesSubscription(topic, deleteTopic) &&
          !remainingSubs.some((sub) => topicMatchesSubscription(topic, sub)),
      );
      removeTopics(orphanTopics);
    }
    setDeleteTopic(null);
  }, [deleteTopic, unsubscribe, subscriptionList, topicList, removeTopics]);

  const editingSubscription = editTopic ? subscriptionList[editTopic] : undefined;

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
              label={
                <Box
                  sx={{ width: '100%' }}
                  onContextMenu={(e) => handleContextMenu(e, subscriptionNode.suscription)}
                >
                  {subscriptionNode.suscription}
                </Box>
              }
            >
              {topics.map((topic) =>
                renderTopicNode(topic, `${subscriptionId}/${topic.label}`, handleSelectTopic)
              )}
            </TreeItem>
          );
        })}
      </SimpleTreeView>

      <LeftClickMenu 
        menu={menu} 
        closeMenu={closeMenu} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete}
      />

      <SubscriptionModal
        open={editingSubscription !== undefined}
        onClose={() => setEditTopic(null)}
        subscription={editingSubscription}
      />
      
      <DeleteSuscriptionDialog 
        deleteTopic={deleteTopic} 
        confirmDelete={confirmDelete} 
        setDeleteTopic={setDeleteTopic}
      />
    </Box>
  );
}
