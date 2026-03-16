import Grid from "@mui/material/Grid";
import MQTTDetailedMessageData from "./MQTTDetailedMessageData.jsx";

interface prop {
  message: MQTTMessage
}

export default function MQTTDetailed ({ message }: prop) {
  return (
    <Grid 
      container 
      direction="column"
    >
      <Grid size={12}>
        <MQTTDetailedMessageData message={message}/>
      </Grid>
      <Grid size={12}>
      </Grid>
    </Grid>
  );
}