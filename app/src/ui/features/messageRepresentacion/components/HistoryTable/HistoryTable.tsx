import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, type GridColDef, type GridRowParams } from '@mui/x-data-grid';
import { useMQTTContext } from '../../hooks/useMQTTContext';
import DecoderService from '../../service/DecorderService';
import type { MQTTMessageList } from '../../types/mqtt.types';

interface Prop {
  handleClick: (message: MQTTMessage) => void;
}

function HistoryTable({ handleClick }: Prop) {
  const { getSelectedTopic, getTypedMessageList } = useMQTTContext();

  const selectedTopic = getSelectedTopic();
  const message: MQTTMessageList = getTypedMessageList(selectedTopic);

  const columns: GridColDef[] = [
    {
      field: 'timeStamp',
      headerName: 'TimeStamp',
      width: 125,
    },
    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      renderCell: (params) =>
        DecoderService(params.row.data, message.format),
    },
  ];

  const rows = message.messageList.map((msg, index) => ({
    id: `${msg.timeStamp}-${index}`,
    ...msg,
  }));

  return (
    <Paper sx={{ width: '100%', height: '100%' }}>
      <DataGrid
        key={selectedTopic}
        rows={rows}
        columns={columns}
        onRowClick={(params: GridRowParams) =>
          handleClick(params.row as MQTTMessage)
        }
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