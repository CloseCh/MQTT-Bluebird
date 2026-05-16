import { useMQTTContext } from '@/features/messageRepresentacion';
import { useTransportContext } from '@/transport';
import { Box, Button } from '@mui/material';

interface DeleteRetainButtonProp {
  disabled: boolean;
}

export function DeleteRetainButton({disabled}: DeleteRetainButtonProp) {
  const transport = useTransportContext();
  const { getMessageSelected } = useMQTTContext();

  const handleClick = () => {
    const message = getMessageSelected();

    if (message === null) return;

    void transport.publishMQTT({
      topic: message.topic,
      message: '',
      retain: true,
    });
  }

  return (
    <Box sx={{ width: '100%'}}>
      <Button
        variant='contained'
        onClick={handleClick}
        disabled={disabled}
      >
        Eliminar retenido
      </Button>
    </Box>
  );
}

export default DeleteRetainButton;