import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  type SxProps,
  type Theme
} from "@mui/material";
import { useRepresentationContext } from '@/features/messageRepresentacion';

interface TableHeaderProp {
  styleProp: SxProps<Theme>
}

export function TableHeader({ styleProp }: TableHeaderProp) {
  const { getSelectedTopic } = useRepresentationContext();
  const selectedTopic = getSelectedTopic();

  return (
    <Box sx={styleProp}>
      <AppBar position='sticky' elevation={0}>
        <Toolbar variant='dense'>
          <Stack direction='row' alignItems='center' spacing={3}>
            Topic: {selectedTopic}
          </Stack>

          <Box sx={{ ml: 'auto', }}>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Button variant='outlined'>Limpiar</Button>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}