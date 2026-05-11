import { useMQTTContext } from '@/features/messageRepresentacion';
import { Box, Button } from '@mui/material';

interface DeleteRetainButtonProp {
  disabled: boolean;
}

export function DeleteRetainButton({disabled}: DeleteRetainButtonProp) {
  const { getMessageSelected } = useMQTTContext();

  const handleClick = () => {
    const message = getMessageSelected();

    if (message === null) return;

    void window.electron.publishMQTT({
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