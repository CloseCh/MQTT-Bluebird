import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useConnectionForm, validateHost, validatePort } from "./hooks/useConnectionForm";
import { PROTOCOLS, STATUS_COLORS, STATUS_LABELS } from "../../constants";

export function ConnectionForm() {
  const {
    form,
    status,
    isConnected,
    isConnecting,
    errorMessage,
    connectedEndpoint,
    handleProtocolChange,
    onSubmit,
    onDisconnect,
    dismissError,
  } = useConnectionForm();

  return (
    <Stack spacing={2}>

      {/* Status badge */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" color="text.secondary">
          Conexión MQTT
        </Typography>
        <Chip
          size="small"
          color={STATUS_COLORS[status]}
          label={STATUS_LABELS[status]}
        />
      </Box>

      <Divider />

      {/* Connected state: show endpoint */}
      {isConnected && connectedEndpoint ? (
        <Alert severity="success" variant="outlined">
          Conectado a <strong>{connectedEndpoint}</strong>
        </Alert>
      ) : (
        /* Disconnected / error state: show the form */
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>

            {/* Protocol + Host */}
            <Stack direction="row" spacing={1}>
              <TextField
                select
                label="Protocolo"
                sx={{ minWidth: 110 }}
                value={form.watch("protocol")}
                onChange={handleProtocolChange}
              >
                {PROTOCOLS.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Host"
                fullWidth
                placeholder="localhost"
                {...form.register("host", { validate: validateHost })}
                error={!!form.formState.errors.host}
                helperText={form.formState.errors.host?.message}
              />
            </Stack>

            {/* Port */}
            <TextField
              label="Puerto"
              placeholder="1883"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">:</InputAdornment>
                  ),
                },
              }}
              {...form.register("port", { validate: validatePort })}
              error={!!form.formState.errors.port}
              helperText={form.formState.errors.port?.message}
            />

            {/* Error alert */}
            {status === "error" && errorMessage && (
              <Alert severity="error" onClose={dismissError}>
                {errorMessage}
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              disabled={isConnecting}
              startIcon={
                isConnecting ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {isConnecting ? "Conectando…" : "Conectar"}
            </Button>

          </Stack>
        </form>
      )}

    </Stack>
  );
}

export default ConnectionForm;