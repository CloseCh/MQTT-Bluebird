import Stack from "@mui/material/Stack";
import { useState, useCallback} from "react";
import MQTTDetailed from "../../components/mqttDetailed/MQTTDetailed.jsx";
import MQTTList from "../../components/mqttList/MQTTList.jsx";

import { useMQTT } from "../../function/messageManagement.js";

export default function Main() {
	const [ selectedItem, setSelectedItem ] = useState("");
	const { topics } = useMQTT(100);

	const handleClick = useCallback((topic: string) => {
    setSelectedItem(topic);
  }, []);

	return (
		<>
			<Stack 
				direction="row" 
				sx={{ width: '100%' }}
			>
				<MQTTList handleClick={handleClick} topics={topics} />
				{ selectedItem !== "" ? <MQTTDetailed /> : <></>}
			</Stack>
		</>
	);
}