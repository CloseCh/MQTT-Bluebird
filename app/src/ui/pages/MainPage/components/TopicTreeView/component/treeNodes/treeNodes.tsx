import type { MouseEvent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import type { TopicNode, TreeRoot } from '../../types/tree.type';
import { orderByLabel } from '../../utils/treeInstanciation.util';

export interface NodeOptions {
  onSelectTopic: (topic: string) => void;
  /** Muestra un checkbox en los nodos hoja / con datos. */
  leafCheckbox: boolean;
  /** ¿El topic está marcado? Marcado por defecto si no se proporciona. */
  isTopicChecked?: (topic: string) => boolean;
  /** Alterna el check de un topic hoja. */
  onToggleTopic?: (topic: string) => void;
}

export interface BranchOptions extends NodeOptions {
  onSubscriptionContextMenu: (e: MouseEvent, topic: string) => void;
}

/** Envuelve la etiqueta de una hoja con un checkbox cuando procede. */
function withLeafCheckbox(label: ReactNode, topic: string, opts: NodeOptions): ReactNode {
  if (!opts.leafCheckbox) return label;
  const checked = opts.isTopicChecked ? opts.isTopicChecked(topic) : true;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        size='small'
        checked={checked}
        onChange={() => opts.onToggleTopic?.(topic)}
        onClick={(e) => e.stopPropagation()}
      />
      {label}
    </Box>
  );
}

export function renderTopicNode(node: TopicNode, idPath: string, opts: NodeOptions): ReactNode {
  const { onSelectTopic } = opts;
  const children = (node.children ? [...node.children.values()] : []).sort(orderByLabel);
  const isLeaf = children.length === 0;
  const label = isLeaf ? node.fullPath ?? node.label : node.label;
  const hasOwnData = !isLeaf && node.fullPath != null;

  return (
    <TreeItem
      key={idPath}
      itemId={idPath}
      label={isLeaf && node.fullPath ? withLeafCheckbox(label, node.fullPath, opts) : label}
      onClick={isLeaf && node.fullPath ? () => onSelectTopic(node.fullPath!) : undefined}
    >
      {hasOwnData && (
        <TreeItem
          key={`${idPath}::self`}
          itemId={`${idPath}::self`}
          label={withLeafCheckbox(
            <Box component='span' sx={{ color: 'warning.main', fontWeight: 700 }}>
              {`● ${node.label} (este topic)`}
            </Box>,
            node.fullPath!,
            opts,
          )}
          onClick={() => onSelectTopic(node.fullPath!)}
        />
      )}
      {children.map((child) =>
        renderTopicNode(child, `${idPath}/${child.label}`, opts),
      )}
    </TreeItem>
  );
}

/** Ramas raíz (una por suscripción) con sus topics, ordenadas alfabéticamente. */
export function renderSubscriptionBranches(tree: TreeRoot, opts: BranchOptions): ReactNode {
  const { onSubscriptionContextMenu, ...nodeOpts } = opts;

  return [...tree.children.values()]
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
              onContextMenu={(e) => onSubscriptionContextMenu(e, subscriptionNode.suscription)}
            >
              {subscriptionNode.suscription}
            </Box>
          }
        >
          {topics.map((topic) =>
            renderTopicNode(topic, `${subscriptionId}/${topic.label}`, nodeOpts),
          )}
        </TreeItem>
      );
    });
}
