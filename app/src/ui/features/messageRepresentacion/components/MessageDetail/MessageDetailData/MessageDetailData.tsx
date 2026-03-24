import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import messageDecoder from '../../../../../function/messageDecorder.js';
import type { MessageFormatEnum } from '../../../types/mqtt.types.js';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
type Packet = import('mqtt').IPublishPacket;

interface Prop {
  messageSelected: MQTTMessage;
  messageFormat: MessageFormatEnum;
}

export default function MessageDetailData ({ messageSelected, messageFormat }: Prop) {
  const messagePacket: Packet = messageSelected.packet;

  const formatPayload = (data: string, format: MessageFormatEnum) => {
    const decoded = messageDecoder(data, format);
    try {
      return JSON.stringify(JSON.parse(decoded), null, 2);
    } catch {
      return decoded;
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title={messagePacket.topic} subheader="MQTT Publish" />
        <CardContent>

          {/* Flags */}
          <Stack direction="row" spacing={1} mb={2}>
            <Chip label={`QoS ${messagePacket.qos}`} color="primary" size="small" />
            {messagePacket.dup && <Chip label="DUP" size="small" />}
            {messagePacket.retain && <Chip label="RETAIN" color="warning" size="small" />}
          </Stack>

          {/* Payload raw */}
          <TextField
            label="Payload"
            value={messagePacket.payload.toString()}
            multiline
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />

          {/* Message decodificado */}
          <Typography variant="subtitle2" color="text.secondary" mt={2} mb={0.5}>
            Message
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              backgroundColor: "#2bbdfb",
              borderRadius: 1,
              overflowX: "auto",
            }}
          >
            <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "0.875rem" }}>
              {formatPayload(messageSelected.data, messageFormat)}
            </pre>
          </Paper>

          {/* Properties opcionales */}
          {messagePacket.properties && (
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Properties</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {Object.entries(messagePacket.properties).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemText primary={key} secondary={String(value)} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}

        </CardContent>
      </Card>
    </>
  );
}