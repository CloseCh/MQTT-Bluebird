import Grid from "@mui/material/Grid";
import MQTTDetailedMessageData from "./MQTTDetailedMessageData.jsx";


export default function MQTTDetailed () {
  return (
    <Grid 
      container 
      direction="column"
    >
      <Grid size={12}>
        <MQTTDetailedMessageData />
      </Grid>
      <Grid size={12}>

      </Grid>
    </Grid>
  );
}