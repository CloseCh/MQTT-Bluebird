import type { MouseEvent } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import type { TreeRoot } from '../../types/tree.type';
import { renderSubscriptionBranches } from '../treeNodes/treeNodes';

interface Props {
  tree: TreeRoot;
  onSelectTopic: (topic: string) => void;
  onSubscriptionContextMenu: (e: MouseEvent, topic: string) => void;
}

export default function HistoryTree({ tree, onSelectTopic, onSubscriptionContextMenu }: Props) {
  return (
    <SimpleTreeView>
      {renderSubscriptionBranches(tree, {
        onSelectTopic,
        onSubscriptionContextMenu,
        leafCheckbox: false,
      })}
    </SimpleTreeView>
  );
}
