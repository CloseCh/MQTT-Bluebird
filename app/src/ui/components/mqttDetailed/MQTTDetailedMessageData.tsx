import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type Packet = import('mqtt').IPublishPacket;

interface Prop {
  message: MQTTMessage
}

export default function MQTTDetailedMessageData ({ message }: Prop) {
  const packet: Packet = message.packet

  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <List>
          <ListItem> Topic: {message.topic} </ListItem>
          <ListItem> Message: {message.data.toString('utf-8')} </ListItem>
          <ListItem> QoS: {packet.qos} </ListItem>
          <ListItem> Retain: {packet.retain} </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </>
  );
}