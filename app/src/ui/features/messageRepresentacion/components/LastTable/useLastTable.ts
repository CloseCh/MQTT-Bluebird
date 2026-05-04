import { useCallback, useMemo } from 'react';
import { useMQTTContext } from '../../hooks/useMQTTContext';
import DecoderService from '../../service/DecorderService';
import type { GridColDef } from '@mui/x-data-grid';

export function useLastTable() {
  const {
    topicList,
    getTypedMessageList,
    setSelectedTopic,
    setMessageSelected
  } = useMQTTContext();

  function tsToMs(timeStamp: string): number {
    const [hms, ms] = timeStamp.split('.') as [string, string];
    const [h, m, s] = hms.split(':').map(Number) as [number, number, number];
    return (h * 3600 + m * 60 + s) * 1000 + Number(ms);
  }

  function nowMs(): number {
    const now = new Date();
    return (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();
  }

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
      .flatMap((topic) => {
        const { messageList } = getTypedMessageList(topic);
        return messageList.map((msg, i) => ({ id: `${topic}-${msg.timeStamp}-${i}`, ...msg }));
      })
      .sort((a, b) => tsToMs(b.timeStamp) - tsToMs(a.timeStamp)),
    [topicList, getTypedMessageList]
  );

  const handleClick = useCallback((message: MQTTMessage) => {
    setMessageSelected(message);
    setSelectedTopic(message.topic);
  }, [setSelectedTopic, setMessageSelected]);

  return {
    columns,
    rows,
    handleClick,
    tsToMs,
    nowMs
  };
}