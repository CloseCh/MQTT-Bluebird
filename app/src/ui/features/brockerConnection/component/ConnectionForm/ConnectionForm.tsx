import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useConnectionForm } from './useConnectionForm';
import { PROTOCOLS } from '../../constants/connection.constants';

export function ConnectionForm() {
  const {
    form,
    status,
    isConnecting,
    errorMessage,
    validateHost,
    validatePort,
    handleProtocolChange,
    onSubmit,
    dismissError,
  } = useConnectionForm();

  return (
    <Stack spacing={2}>

      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} noValidate>
        <Stack spacing={2}>

          {/* Protocol + Host */}
          <Stack direction='row' spacing={1}>
            <TextField
              select
              label='Protocolo'
              sx={{ minWidth: 110 }}
              value={form.watch('protocol')}
              onChange={handleProtocolChange}
            >
              {PROTOCOLS.map(({ value, label }) => {
                if (typeof window.electron === 'undefined' && value.includes('mqtt')) return <></>;

                return (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                );
              })}
            </TextField>

            <TextField
              label='Host'
              fullWidth
              placeholder='localhost'
              {...form.register('host', { validate: validateHost })}
              error={!!form.formState.errors.host}
              helperText={form.formState.errors.host?.message}
            />
          </Stack>

          {/* Port */}
          <TextField
            label='Puerto'
            placeholder='1883'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>:</InputAdornment>
                ),
              },
            }}
            {...form.register('port', { validate: validatePort })}
            error={!!form.formState.errors.port}
            helperText={form.formState.errors.port?.message}
          />

          {/* Credentials */}
          <Stack direction='row' spacing={1}>
            <TextField
              label='Usuario'
              fullWidth
              placeholder='(opcional)'
              {...form.register('username')}
            />

            <TextField
              label='Contraseña'
              fullWidth
              placeholder='(opcional)'
              type='password'
              {...form.register('password')}
            />
          </Stack>

          {/* Error alert */}
          {status === 'error' && errorMessage && (
            <Alert severity='error' onClose={dismissError}>
              {errorMessage}
            </Alert>
          )}

          {/* Submit */}
          <Button
            type='submit'
            variant='contained'
            disabled={isConnecting}
            startIcon={
              isConnecting ? (
                <CircularProgress size={16} color='inherit' />
              ) : null
            }
          >
            {isConnecting ? 'Conectando…' : 'Conectar'}
          </Button>

        </Stack>
      </form>

    </Stack>
  );
}

export default ConnectionForm;