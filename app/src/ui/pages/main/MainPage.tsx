import { useState, useCallback} from "react";

import Grid from "@mui/material/Grid";

import MQTTList from "../../components/mqttList/MQTTList.js";

import { useMQTT } from "../../function/messageManagement.js";
import { HEADER_HEIGHT } from "../../constants/layout.js";
import MQTTTable from "../../components/mqttTable/MQTTTable.js";

export default function MainPage() {
	const [ selectedTopic, setSelectedTopic ] = useState("");
	const { topics, getMessageList, getFormat, setFormat } = useMQTT(100);

	const handleClick = useCallback((topic: string) => {
    setSelectedTopic(topic);
  }, []);


	const packetList: MQTTMessage[] = getMessageList(selectedTopic);
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
					<MQTTTable messageList={packetList}/>
				</Grid>
			</Grid>
		</>
	);
}