import { useCallback, useMemo } from 'react';
import { useRepresentationContext } from '../../context/RepresentationProvider';
import DecoderService from '../../service/DecorderService';
import type { MQTTMessageList } from '../../types/mqtt.types';
import type { GridColDef } from '@mui/x-data-grid';

export function useHistoryTable() {
  const { 
    getSelectedTopic, 
    getTypedMessageList, 
    setSelectedTopic, 
    setMessageSelected 
  } = useRepresentationContext();

  const handleClick = useCallback((message: MQTTMessage) => {
    setMessageSelected(message);
    setSelectedTopic(message.topic);
  }, [setMessageSelected, setSelectedTopic]);
  
  const selectedTopic = getSelectedTopic();
  const message: MQTTMessageList = getTypedMessageList(selectedTopic);

  const columns: GridColDef<MQTTMessage>[] = useMemo(() => [
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
    handleClick,
    columns, 
    rows 
  };
}