import {
  Box,
  Button,
  Stack,
} from "@mui/material";
import { useRepresentationContext } from '@/features/messageRepresentacion';

export function TableHeader() {
  const { getSelectedTopic } = useRepresentationContext();
  const selectedTopic = getSelectedTopic();

  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        flexShrink: 0,
        p: '10px 10px 10px 10px'
      }}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        Topic: {selectedTopic}

        <Box sx={{ alignItems: 'center' }}>
          <Button variant='outlined'>Limpiar</Button>
        </Box>

      </Stack>
    </Box>
  );
}