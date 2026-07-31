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
import { ConnectionTabs } from '../ConnectionTabs/ConnectionTabs';
import { PROTOCOLS } from '../../constants/connection.constants';

export function ConnectionForm() {
  const {
    form,
    connections,
    activeId,
    selectConnection,
    addConnection,
    removeConnection,
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

      <ConnectionTabs
        connections={connections}
        activeId={activeId}
        onSelect={selectConnection}
        onAdd={addConnection}
        onRemove={removeConnection}
      />

      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} noValidate>
        <Stack spacing={2}>

          {/* Nombre del perfil (opcional; si está vacío, el tab muestra host:port) */}
          <TextField
            label='Nombre'
            fullWidth
            placeholder={`${form.watch('host')}:${form.watch('port')}`}
            {...form.register('label')}
          />

          {/* Protocol + Host */}
          <Stack direction='row' spacing={1}>
            <TextField
              select
              label='Protocolo'
              sx={{ minWidth: 130 }}
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
                  <InputAdornment position='start' />
                ),
              },
            }}
            {...form.register('port', { validate: validatePort })}
            error={!!form.formState.errors.port}
            helperText={form.formState.errors.port?.message}
          />

          {/* Path (solo WebSocket: p.ej. /mqtt en brokers públicos) */}
          {['ws', 'wss'].includes(form.watch('protocol')) && (
            <TextField
              label='Ruta'
              placeholder='mqtt'
              helperText='Opcional. Muchos brokers WebSocket la requieren (p.ej. /mqtt en HiveMQ).'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start' />
                  ),
                },
              }}
              {...form.register('path')}
            />
          )}

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