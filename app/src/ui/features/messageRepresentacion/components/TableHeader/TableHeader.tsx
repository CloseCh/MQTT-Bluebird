import {
  Box,
  Button,
  Stack,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { useRepresentationContext } from '@/features/messageRepresentacion';

interface TableHeaderProps {
  styleProp?: SxProps<Theme>;
}

export function TableHeader({ styleProp }: TableHeaderProps) {
  const { getSelectedTopic } = useRepresentationContext();
  const selectedTopic = getSelectedTopic();

  return (
    <Box
      sx={[
        {
          width: '100%',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flexShrink: 0,
          p: '10px 10px 10px 10px'
        },
        ...(Array.isArray(styleProp) ? styleProp : [styleProp])
      ]}
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