import { useState, useCallback} from "react";

import Stack from "@mui/material/Stack";

import MQTTDetailed from "../../components/mqttDetailed/MQTTDetailed.jsx";
import MQTTList from "../../components/mqttList/MQTTList.jsx";

import { useMQTT } from "../../function/messageManagement.js";

export default function Main() {
	const [ selectedItem, setSelectedItem ] = useState("");
	const { topics, getMessage } = useMQTT(100);

	const handleClick = useCallback((topic: string) => {
    setSelectedItem(topic);
  }, []);

	function handleDetailedClick () {
		setSelectedItem("");
	}

	const packetList: MQTTMessage[] = getMessage(selectedItem);

	const selectedTopicMessage: MQTTMessage = packetList[packetList.length - 1];

	return (
		<>
			<Stack 
				direction="row" 
				sx={{ width: '100%' }}
			>
				<MQTTList handleClick={handleClick} topics={topics} />
				{selectedItem !== "" ? <MQTTDetailed handleClick={handleDetailedClick} selectedMessage={selectedItem} message={selectedTopicMessage} /> : <></>}
			</Stack>
		</>
	);
}