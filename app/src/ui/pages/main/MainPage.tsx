import { useState, useCallback} from "react";

import Grid from "@mui/material/Grid";

import { HEADER_HEIGHT } from "../../constants/layout.js";
import { useMQTT } from "../../function/messageManagement.js";

import MQTTList from "../../components/mqttList/MQTTList.js";
import MQTTTable from "../../components/mqttTable/MQTTTable.js";
import MQTTDetailed from "../../components/mqttDetailed/MQTTDetailed.js";

export default function MainPage() {
	const [ selectedTopic, setSelectedTopic ] = useState("");
	const [ selectedMessage, setSelectedMessage] = useState<MQTTMessage | null>(null);
	
	const { topics, getTypedMessageList, setFormat } = useMQTT(100);

	const handleClick = useCallback((topic: string) => {
    setSelectedTopic(topic);
  }, []);

	const handleTableClick = useCallback((message: MQTTMessage) => {
		setSelectedMessage(message);
	}, []);

	const handleCloseDetailedClick = () => {
		setSelectedMessage(null);
	};

	const typedMessageList: MQTTMessageList = getTypedMessageList(selectedTopic);
	
	return (
		<>
			<Grid 
				container 
				spacing={0}
				sx={{ width: '100%', height: "100%", marginTop: `${HEADER_HEIGHT}px` }}
			>
				<Grid size={{ xs: 6, md: 2 }} sx={{ height: '100%' }}>
					<MQTTList handleClick={handleClick} topics={topics} selectedTopic={selectedTopic}/>
				</Grid>
				<Grid size={{ xs: 6, md: 10 }} sx={{ height: '100%' }}>
					<MQTTTable handleClick={handleTableClick} messageList={typedMessageList.messageList ?? []}/>
				</Grid>
			</Grid>
			{selectedMessage !== null ? 
				<MQTTDetailed 
					handleClick={handleCloseDetailedClick} 
					message={selectedMessage} 
					messageFormat={typedMessageList.format}
					setMessageFormat={setFormat}
				/> 
				: 
				<></>
			}
			
		</>
	);
}