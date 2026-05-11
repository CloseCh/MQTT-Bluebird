import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsForm from '../../../../features/settings/components/settingsForm';
import { useNavigationStore } from '@/features/navigation/stores/navigationStore';
import { useNavigate } from 'react-router';

export default function SettingsPage() {
  const { closeSettings } = useNavigationStore();
  const navigate = useNavigate();

  const handleBack = () => {
    closeSettings();
    navigate('/');
  };

  return (
    <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
      <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 4 }}>
        <IconButton onClick={handleBack} size='small'>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h5'>Configuración</Typography>
      </Stack>
      <SettingsForm />
    </Box>
  );
}
