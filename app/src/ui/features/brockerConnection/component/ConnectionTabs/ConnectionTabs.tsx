import { Box, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import type { SavedConnection } from '../../types/connection.types';
import { tabLabel } from '../../utils/connection.utils';

interface ConnectionTabsProps {
  connections: SavedConnection[];
  activeId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function ConnectionTabs({
  connections,
  activeId,
  onSelect,
  onAdd,
  onRemove,
}: ConnectionTabsProps) {
  const canRemove = connections.length > 1;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={activeId}
        onChange={(_, id: string) => onSelect(id)}
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
        // minWidth: 0 permite que el contenedor flex encoja y las tabs
        // hagan scroll horizontal en vez de desbordar el panel.
        sx={{ flex: 1, minWidth: 0, minHeight: 44 }}
      >
        {connections.map((conn) => (
          <Tab
            key={conn.id}
            value={conn.id}
            sx={{ minHeight: 44, textTransform: 'none' }}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {tabLabel(conn)}
                {canRemove && (
                  <IconButton
                    component='span'
                    size='small'
                    aria-label={`Eliminar ${tabLabel(conn)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(conn.id);
                    }}
                    sx={{ p: 0.25 }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                )}
              </Box>
            }
          />
        ))}
      </Tabs>

      <Tooltip title='Nueva conexión' arrow>
        <IconButton aria-label='Nueva conexión' onClick={onAdd} sx={{ ml: 0.5 }}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ConnectionTabs;
