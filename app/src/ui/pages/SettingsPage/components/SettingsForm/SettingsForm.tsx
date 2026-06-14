import {
  Box,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useSettingsStore } from '@stores/settingsStore/settingsStore';

export default function SettingsForm() {
  const { darkMode, maxMessages, setDarkMode, setMaxMessages } = useSettingsStore();

  const handleMaxMessagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setMaxMessages(value);
    }
  };

  return (
    <Stack spacing={4} sx={{ maxWidth: 480 }}>
      <Box>
        <Typography variant='overline' color='text.secondary'>
          Apariencia
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          }
          label='Modo oscuro'
        />
      </Box>

      <Box>
        <Typography variant='overline' color='text.secondary'>
          Mensajes
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          label='Máximo de mensajes por tópico'
          type='number'
          value={maxMessages}
          onChange={handleMaxMessagesChange}
          slotProps={{ htmlInput: { min: 1, max: 10000 } }}
          helperText='Cantidad de mensajes guardados en el historial de cada tópico.'
          size='small'
          sx={{ width: 320 }}
        />
      </Box>
    </Stack>
  );
}
