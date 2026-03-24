import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import messageDecoder from '../../../function/messageDecorder.js';
import type { MessageFormatEnum } from '../../../types/mqtt.types.js';
type Packet = import('mqtt').IPublishPacket;

interface Prop {
  messageSelected: MQTTMessage;
  messageFormat: MessageFormatEnum;
}

export default function MessageDetailData ({ messageSelected, messageFormat }: Prop) {
  const messagePacket: Packet = messageSelected.packet;
  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <List>
          <ListItem> Topic: {messageSelected.topic} </ListItem>
          <ListItem> Message: <pre>{messageDecoder(messageSelected.data, messageFormat)}</pre> </ListItem>
          <ListItem> QoS: {messagePacket.qos} </ListItem>
          <ListItem> Retain: {messagePacket.retain} </ListItem>
        </List>
      </CardContent>
    </Card>
    </>
  );
}