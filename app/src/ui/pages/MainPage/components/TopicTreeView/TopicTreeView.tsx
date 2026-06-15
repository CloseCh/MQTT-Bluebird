import { useCallback, useMemo, useState } from 'react';
import { useRepresentationContext } from '@/features/messageRepresentacion';
import { useSubscriptionContext, SubscriptionModal } from '@/features/messageSubscription';

import Box from '@mui/material/Box';

import type { ContextMenuState } from './types/tree.type';

import { buildTree } from './utils/treeInstanciation.util';
import { topicMatchesSubscription } from './utils/treeSearch.util';

import DeleteSuscriptionDialog from './component/DeleteSuscriptionDialog/DeleteSuscriptionDialog';
import LeftClickMenu from './component/LeftClickMenu/LeftClickMenu';
import HistoryTree from './component/HistoryTree/HistoryTree';
import TopicTree from './component/TopicTree/TopicTree';
import LastTree from './component/LastTree/LastTree';

export default function TopicTreeView() {
  const { subscriptionList, unsubscribe, updateSubscriptionState } = useSubscriptionContext();
  const { topicList, tableType, setSelectedTopic, removeTopics, isTopicChecked, toggleTopicChecked } =
    useRepresentationContext();

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
      {tableType === 'topic' ? (
        <TopicTree
          tree={tree}
          onSubscriptionContextMenu={handleContextMenu}
          isChecked={(sub) => subscriptionList[sub]?.selected ?? false}
          onToggle={updateSubscriptionState}
        />
      ) : tableType === 'last' ? (
        <LastTree
          tree={tree}
          onSelectTopic={handleSelectTopic}
          onSubscriptionContextMenu={handleContextMenu}
          isTopicChecked={isTopicChecked}
          onToggleTopic={toggleTopicChecked}
        />
      ) : (
        <HistoryTree
          tree={tree}
          onSelectTopic={handleSelectTopic}
          onSubscriptionContextMenu={handleContextMenu}
        />
      )}

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
