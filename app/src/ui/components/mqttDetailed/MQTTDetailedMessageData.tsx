import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import messageDecoder from '../../function/messageDecorder.js';
import { type MessageTypes } from '../../constants/types.js';
type Packet = import('mqtt').IPublishPacket;

interface Prop {
  message: MQTTMessage
  messageFormat: MessageTypes
}

export default function MQTTDetailedMessageData ({ message, messageFormat }: Prop) {
  const packet: Packet = message.packet

  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <List>
          <ListItem> Topic: {message.topic} </ListItem>
          <ListItem> Message: <pre>{messageDecoder(message.data, messageFormat)}</pre> </ListItem>
          <ListItem> QoS: {packet.qos} </ListItem>
          <ListItem> Retain: {packet.retain} </ListItem>
        </List>
      </CardContent>
    </Card>
    </>
  );
}