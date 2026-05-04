import Paper from '@mui/material/Paper';
import { DataGrid, type GridRowParams } from '@mui/x-data-grid';
import { useTopicTable } from './useTopicTable';
import { FLASH_DURATION } from '../../constants/TypeSelector.constants';

export function TopicTable( ) {
  const {
    selectedTopic,
    columns,
    rows,
    handleClick,
    tsToMs,
    nowMs
  } = useTopicTable();

  return (
    <Paper sx={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        key={selectedTopic}
        rows={rows}
        columns={columns}
        onRowClick={(params: GridRowParams) => handleClick(params.row as MQTTMessage)}
        disableColumnMenu
        hideFooter
        getRowClassName={(params) =>
          nowMs() - tsToMs(params.row.timeStamp) < FLASH_DURATION ? 'row-flash' : ''
        }
        sx={(theme) => ({
          flex: 1,
          minHeight: 0,
          '& .MuiDataGrid-cell': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          cursor: 'pointer',
          '@keyframes rowFlash': {
            '0%': {
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(100, 181, 246, 0.4)'
                : 'rgba(25, 118, 210, 0.2)',
            },
            '100%': { backgroundColor: 'transparent' },
          },
          '& .row-flash': {
            animation: `rowFlash ${FLASH_DURATION}ms ease-out forwards`,
          },
        })}
      />
    </Paper>
  );
}