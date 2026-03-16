import Stack from "@mui/material/Stack";
import MQTTList from "../../components/mqttList/MQTTList";
import { useState } from "react";
import MQTTDetailed from "../../components/mqttDetailed/MQTTDetailed";

export default function Main() {
	const [ selectedItem, setSelectedItem ] = useState("");

	function handleClick (topics: string) {
		setSelectedItem(topics);
	}

	return (
		<>
			<Stack 
				direction="row" 
				sx={{ width: '100%' }}
			>
				<MQTTList handleClick={handleClick} />
				{ selectedItem !== "" ? <MQTTDetailed /> : <></>}
			</Stack>
		</>
	);
}