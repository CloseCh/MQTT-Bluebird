import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import type { MessageFormatEnum } from '../../../types/mqtt.types.js';
import DecoderService from '../../../service/DecorderService.js';

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
        <CardHeader title={messagePacket.topic} subheader="MQTT Publish" />
        <CardContent>

          {/* Flags */}
          <Stack direction="row" spacing={1} mb={2}>
            <Chip label={`QoS ${messagePacket.qos}`} color="primary" size="small" />
            {messagePacket.dup && <Chip label="DUP" size="small" />}
            {messagePacket.retain && <Chip label="RETAIN" color="warning" size="small" />}
          </Stack>

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
              {DecoderService(messageSelected.data, messageFormat)}
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