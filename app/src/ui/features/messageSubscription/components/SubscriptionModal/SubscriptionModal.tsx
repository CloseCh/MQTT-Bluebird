import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { useSubscriptionContext } from '../../context/SubscriptionProvider';
import { DEFAULT_QOS, QOS_OPTIONS } from '../../constants/suscription.constants';
import type { Qos, SubscriptionEntry } from '../../types/subscription.types';

interface SubscriptionModalProp {
  open: boolean;
  onClose: () => void;
  /** Si se pasa, el modal entra en modo edición de esa suscripción. */
  subscription?: SubscriptionEntry;
}

interface SubscriptionFormValues {
  topic: string;
  qos: Qos;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid',
  borderColor: 'divider',
  boxShadow: 24,
  p: 4,
};

export function SubscriptionModal({ open, onClose, subscription }: SubscriptionModalProp) {
  const { subscribe, changeSubscription } = useSubscriptionContext();
  const isEdit = subscription !== undefined;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SubscriptionFormValues>({
    defaultValues: { topic: '', qos: DEFAULT_QOS },
  });

  // sincroniza el formulario con la suscripción a editar cada vez que se abre
  useEffect(() => {
    if (!open) return;
    reset(
      subscription
        ? { topic: subscription.topic, qos: subscription.qos }
        : { topic: '', qos: DEFAULT_QOS },
    );
  }, [open, subscription, reset]);

  const onSubmit = async ({ topic, qos }: SubscriptionFormValues) => {
    const trimmed = topic.trim();
    if (isEdit && subscription) {
      await changeSubscription(subscription.topic, { topic: trimmed, qos });
    } else {
      await subscribe({ topic: trimmed, qos });
    }
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        component='form'
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        sx={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {isEdit ? 'Editar suscripción' : 'Nueva suscripción'}
        </Typography>

        <Controller
          name='topic'
          control={control}
          rules={{
            required: 'El topic es obligatorio',
            validate: (value) => value.trim().length > 0 || 'El topic es obligatorio',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label='Topic'
              fullWidth
              margin='normal'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name='qos'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='QoS'
              fullWidth
              margin='normal'
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              {QOS_OPTIONS.map((qos) => (
                <MenuItem key={qos} value={qos}>
                  {qos}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            mt: 3,
          }}
        >
          <Button
            type='button'
            variant='outlined'
            onClick={handleClose}
          >
            Salir
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={isSubmitting}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
