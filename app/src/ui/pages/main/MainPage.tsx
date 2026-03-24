import { useState, useCallback} from "react";

import Grid from "@mui/material/Grid";

import { HEADER_HEIGHT } from "../../constants/layout.js";

import { TopicList, HistoryTable, MessageDetail } from "@/features/messageRepresentacion";

import { useMQTTContext } from '@/features/messageRepresentacion';

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
			<Grid 
				container 
				spacing={0}
				sx={{ width: '100%', height: "100%", marginTop: `${HEADER_HEIGHT}px` }}
			>
				<Grid size={{ xs: 6, md: 2 }} sx={{ height: '100%' }}>
					<TopicList />
				</Grid>
				<Grid size={{ xs: 6, md: 10 }} sx={{ height: '100%' }}>
					{selectedTopic !== ""
						? <HistoryTable handleClick={handleTableClick} />
						: <></>
					}
				</Grid>
			</Grid>
			{messageSelected
				? <MessageDetail messageSelected={messageSelected} selectedTopic={selectedTopic} handleClick={handleCloseDetailedClick}/> 
				: <></>
			}
		</>
	);
}