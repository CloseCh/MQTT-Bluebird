import { useState, useCallback} from "react";

import Stack from "@mui/material/Stack";

import MQTTDetailed from "../../components/mqttDetailed/MQTTDetailed.jsx";
import MQTTList from "../../components/mqttList/MQTTList.jsx";

import { useMQTT } from "../../function/messageManagement.js";

export default function Main() {
	const [ selectedTopic, setSelectedTopic ] = useState("");
	const { topics, getMessage, getFormat, setFormat } = useMQTT(100);

	const handleClick = useCallback((topic: string) => {
    setSelectedTopic(topic);
  }, []);

	function handleDetailedClick () {
		setSelectedTopic("");
	}

	const packetList: MQTTMessage[] = getMessage(selectedTopic);
	const selectedTopicMessage: MQTTMessage = packetList[packetList.length - 1];
	const messageFormat: string = getFormat(selectedTopic);
	return (
		<>
			<Stack 
				direction="row" 
				sx={{ width: '100%' }}
			>
				<MQTTList handleClick={handleClick} topics={topics} selectedTopic={selectedTopic}/>
				{
					selectedTopic !== "" ? 
						<MQTTDetailed 
							handleClick={handleDetailedClick} 
							selectedMessage={selectedTopic} 
							message={selectedTopicMessage} 
							messageFormat={messageFormat} 
							setMessageFormat={setFormat}
						/> 
					: 
						<></>
				}
			</Stack>
		</>
	);
}