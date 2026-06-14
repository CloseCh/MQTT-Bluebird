import { Button } from '@mui/material';
import { useDisclosure } from '../../hooks/useDisclosure';
import { SubscriptionModal } from '../SubscriptionModal/SubscriptionModal';

export function SubscriptionButton() {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outlined" onClick={onOpen}> Añadir suscripción </Button>
      <SubscriptionModal open={open} onClose={onClose} />
    </>
  );
}