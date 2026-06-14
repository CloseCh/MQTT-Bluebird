import { useCallback, useMemo } from 'react';
import { useRepresentationContext } from '../../context/RepresentationProvider';
import DecoderService from '../../service/DecorderService';
import { nowMs, tsToMs } from '../../utils/date.util';
import type { GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { FLASH_DURATION } from '../../constants/TypeSelector.constants';

export function useLastTable() {
  const {
    topicList,
    getTypedMessageList,
    setSelectedTopic,
    setMessageSelected
  } = useRepresentationContext();

  const columns: GridColDef<MQTTMessage>[] = useMemo(() => [
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

  const rowClassName = (params: GridRowClassNameParams<MQTTMessage>) =>
    nowMs() - tsToMs(params.row.timeStamp) < FLASH_DURATION ? 'row-flash' : '';

  return {
    columns,
    rows,
    handleClick,
    rowClassName,
  };
}