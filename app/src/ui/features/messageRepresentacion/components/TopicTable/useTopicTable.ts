import { useMemo } from 'react';
import { useMQTTContext } from '../../hooks/useMQTTContext';
import DecoderService from '../../service/DecorderService';
import type { GridColDef } from '@mui/x-data-grid';

export function useTopicTable() {
  const { topicList, getSelectedTopic, getTypedMessageList } = useMQTTContext();
  const selectedTopic = getSelectedTopic();

  const columns: GridColDef[] = useMemo(() => [
    { field: 'timeStamp', headerName: 'TimeStamp', width: 125 },
    { field: 'topic', headerName: 'Topic', flex: 1 },
    {
      field: 'content',
      headerName: 'Content',
      flex: 2,
      renderCell: (params) => {
        const msgList = getTypedMessageList(params.row.topic);
        return DecoderService(params.row.data, msgList.format);
      },
    },
  ], [getTypedMessageList]);

  const rows = useMemo(() =>
    topicList
      .map((topic) => {
        const { messageList } = getTypedMessageList(topic);
        const last = messageList[0];
        if (!last) return null;
        return { id: topic, ...last };
      })
      .filter(Boolean),
    [topicList, getTypedMessageList]
  );

  function tsToMs(timeStamp: string): number {
    const [hms, ms] = timeStamp.split('.') as [string, string];
    const [h, m, s] = hms.split(':').map(Number) as [number, number, number];
    return (h * 3600 + m * 60 + s) * 1000 + Number(ms);
  }
  
  function nowMs(): number {
    const now = new Date();
    return (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();
  }

  return { 
    selectedTopic, 
    columns, 
    rows, 
    tsToMs, 
    nowMs 
  };
}