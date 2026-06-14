import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from '@mui/material';

interface SubscriptionModalProp {
  open: boolean,
  onClose: () => void
}

interface SubscriptionFormValues {
  name: string;
  // ...resto de campos
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export function SubscriptionModal({ open, onClose }: SubscriptionModalProp) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SubscriptionFormValues>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: SubscriptionFormValues) => {
    // lógica de guardado
    console.log(data);
    reset();
    onClose();
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
        onSubmit={void handleSubmit(onSubmit)}
        sx={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Nueva suscripción
        </Typography>

        <Controller
          name='name'
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label='Nombre'
              fullWidth
              margin='normal'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
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