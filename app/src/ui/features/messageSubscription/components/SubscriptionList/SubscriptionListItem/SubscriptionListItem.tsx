import { Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useSubscriptionContext } from '../../../context/SubscriptionProvider';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { SubscriptionModal } from '../../SubscriptionModal/SubscriptionModal';
import type { SubscriptionEntry } from '../../../types/subscription.types';

interface Prop {
  subscription: SubscriptionEntry;
  handleToggle: (topic: string) => void;
}

export function SubscriptionListItem({ subscription, handleToggle }: Prop) {
  const { unsubscribe } = useSubscriptionContext();
  const { open, onOpen, onClose } = useDisclosure();

  const { topic, qos, selected } = subscription;
  const labelId = `checkbox-list-label-${topic}`;

  return (
    <ListItem
      sx={{
        width: '100%',
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Checkbox
        edge='start'
        checked={selected}
        onClick={() => handleToggle(topic)}
        tabIndex={-1}
        slotProps={{ input: { 'aria-labelledby': labelId } }}
      />
      <ListItemText id={labelId} primary={topic} secondary={`QoS ${qos}`} />
      <IconButton type='button' aria-label='Editar' onClick={onOpen}>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton
        type='button'
        aria-label='Eliminar'
        onClick={() => void unsubscribe(topic)}
        edge='end'
      >
        <DeleteOutlineIcon />
      </IconButton>

      <SubscriptionModal open={open} onClose={onClose} subscription={subscription} />
    </ListItem>
  );
}
