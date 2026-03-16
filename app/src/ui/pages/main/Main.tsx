import { useState, useCallback} from "react";

import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";

import MQTTDetailed from "../../components/mqttDetailed/MQTTDetailed.jsx";
import MQTTList from "../../components/mqttList/MQTTList.jsx";

import { useMQTT } from "../../function/messageManagement.js";
import { HEADER_HEIGHT } from "../../constants/layout.js";

export default function Main() {
	const [ selectedItem, setSelectedItem ] = useState("");
	const { topics, getMessage } = useMQTT(100);

	const handleClick = useCallback((topic: string) => {
    setSelectedItem(topic);
  }, []);

	const packetList: MQTTMessage[] = getMessage(selectedItem);

	const selectedTopicMessage: MQTTMessage = packetList[packetList.length - 1];

	return (
		<>
			<Stack 
				direction="row" 
				sx={{ width: '100%' }}
			>
				<MQTTList handleClick={handleClick} topics={topics} />
				<Drawer
					variant={"persistent"}
					anchor="right"
					open={selectedItem !== ""}
					sx={{
						'& .MuiDrawer-paper': {
							top: `${HEADER_HEIGHT}px`,
							height: `calc(100% - ${HEADER_HEIGHT}px)`,
						}
					}}
				>
					{ selectedItem !== "" ? <MQTTDetailed message={selectedTopicMessage} /> : <></>}
				</Drawer>
				
			</Stack>
		</>
	);
}