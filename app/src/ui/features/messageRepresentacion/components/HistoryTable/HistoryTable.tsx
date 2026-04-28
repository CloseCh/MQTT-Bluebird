import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, type GridRowParams } from '@mui/x-data-grid';
import { useHistoryTable } from './hook/useHistoryTable';

interface Props {
  handleClick: (message: MQTTMessage) => void;
}

function HistoryTable({ handleClick }: Props) {
  const { selectedTopic, columns, rows } = useHistoryTable();

  return (
    <Paper sx={{ width: '100%', height: '100%' }}>
      {/* key fuerza remount al cambiar de topic para resetear el estado del DataGrid */}
      <DataGrid
        key={selectedTopic}
        rows={rows}
        columns={columns}
        onRowClick={(params: GridRowParams) => handleClick(params.row as MQTTMessage)}
        disableColumnMenu
        hideFooter
        sx={{
          height: '100%',
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