import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, type GridRowParams } from '@mui/x-data-grid';
import { useHistoryTable } from './useHistoryTable';

function HistoryTable() {
  const { selectedTopic, columns, rows, handleClick} = useHistoryTable();

  return (
    <Paper sx={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        key={selectedTopic}
        rows={rows}
        columns={columns}
        onRowClick={(params: GridRowParams) => handleClick(params.row as MQTTMessage)}
        disableColumnMenu
        hideFooter
        sx={{
          flex: 1,
          minHeight: 0,
          '& .MuiDataGrid-cell': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          cursor: 'pointer',
        }}
      />
    </Paper>
  );
}

const HistoryTableMemo = React.memo(HistoryTable);
export { HistoryTableMemo as HistoryTable };