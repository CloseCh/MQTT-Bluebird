import Stack from "@mui/material/Stack";
import MQTTList from "../../components/mqttList/MQTTList";

export default function Subscription() {
	console.log('hi')
	return (
		<>
			<Stack 
				direction="row" 
				sx={{ width: '100%' }}
			>
				<MQTTList />
			</Stack>
		</>
	);
}