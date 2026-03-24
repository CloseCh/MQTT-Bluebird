import { useState, useCallback} from "react";

import { TopicList, HistoryTable, DataTypeSelector, MessageDetail } from "@/features/messageRepresentacion";

import { useMQTTContext } from '@/features/messageRepresentacion';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function MainPage() {
	const [ messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);

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
				<Box sx={{ width: 200, flexShrink: 0, height: '100%' }}>
					<TopicList />
				</Box>
				{selectedTopic !== "" && 
					<Stack sx={{ height: '100%', width: '100%' }}>
						<Stack direction="row" sx={{ minHeight: 0, minWidth: 0, padding: '20px 20px 0px 20px' }}>
							<Box>
								<DataTypeSelector selectedTopic={selectedTopic}/>
							</Box>
						</Stack>
						<Box sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'auto' }}>
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