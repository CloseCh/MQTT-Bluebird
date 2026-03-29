import { useState, useCallback} from "react";

import { TopicList, HistoryTable, DataTypeSelector, MessageDetail } from "@/features/messageRepresentacion";

import { useMQTTContext } from '@/features/messageRepresentacion';
import { ResizeHandle } from '../../../components/ResizeHandle/ResizeHandle.jsx';

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function MainPage() {
	const [ messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);
	const [sidebarWidth, setSidebarWidth] = useState(200);

	const { getSelectedTopic } = useMQTTContext();

	const selectedTopic = getSelectedTopic();

	const handleTableClick = useCallback((message: MQTTMessage) => {
		setMessageSelected(message);
	}, []);

	const handleCloseDetailedClick = () => {
		setMessageSelected(null);
	};

	return (
		<>
    <Stack direction="row" sx={{ height: '100%', width: '100%' }}>

      <Box sx={{ 
        width: sidebarWidth, 
        flexShrink: 0, 
        height: '100%' ,
        overflow: 'hidden'}}
      >
        <TopicList />
      </Box>

      {/* Handle de resize */}
      <ResizeHandle
				initialSize={sidebarWidth}
				onResize={setSidebarWidth}
				min={100}
				max={500}
			/>

      {selectedTopic !== "" && 
        <Stack sx={{ height: '100%', flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <Stack direction="row" sx={{ minHeight: 0, minWidth: 0, padding: '10px 10px 10px 10px' }}>
            <Box>
              <DataTypeSelector selectedTopic={selectedTopic}/>
            </Box>
          </Stack>
          <Box sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <HistoryTable handleClick={handleTableClick} />
          </Box>
        </Stack>
      }

    </Stack>
    {messageSelected
      ? <MessageDetail messageSelected={messageSelected} selectedTopic={selectedTopic} handleClick={handleCloseDetailedClick}/> 
      : <></>
    }
  </>
	);
}