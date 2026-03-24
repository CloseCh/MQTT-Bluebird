import { useState, useCallback} from "react";

import Grid from "@mui/material/Grid";

import { HEADER_HEIGHT } from "../../constants/layout.js";

import TopicList from "../../components/TopicList/TopicList.jsx";
import HistoryTable from "../../components/HistoryTable/HistoryTable.jsx";
import MessageDetail from "../../components/MessageDetail/MessageDetail.jsx";

import { useMQTTContext } from "../../hooks/useMQTTContext/useMQTTContext.js";

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