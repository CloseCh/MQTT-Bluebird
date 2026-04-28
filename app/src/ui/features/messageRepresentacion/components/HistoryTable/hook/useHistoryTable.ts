import { useMemo } from 'react';
import { type GridColDef } from '@mui/x-data-grid';
import { useMQTTContext } from '../../../hooks/useMQTTContext';
import DecoderService from '../../../service/DecorderService';
import type { MQTTMessageList } from '../../../types/mqtt.types';

export function useHistoryTable() {
  const { getSelectedTopic, getTypedMessageList } = useMQTTContext();

  const selectedTopic = getSelectedTopic();
  const message: MQTTMessageList = getTypedMessageList(selectedTopic);

  const columns: GridColDef[] = useMemo(() => [
    { field: 'timeStamp', headerName: 'TimeStamp', width: 125 },
    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      renderCell: (params) => DecoderService(params.row.data, message.format),
    },
  ], [message.format]);

  const rows = useMemo(() =>
    message.messageList.map((msg, index) => ({
      id: `${msg.timeStamp}-${index}`,
      ...msg,
    })),
    [message.messageList]
  );

  return { 
    selectedTopic, 
    columns, 
    rows 
  };
}