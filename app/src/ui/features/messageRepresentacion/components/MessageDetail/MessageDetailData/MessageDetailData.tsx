import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Chip, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close';

import type { MessageFormatEnum } from '../../../types/mqtt.types.js';
import DecoderService from '../../../service/DecorderService.js';
import RepresentationDataTypeSelector from '../../RepresentationDataTypeSelector/RepresentationDataTypeSelector.js';
import { Box } from '@mui/material';

type Packet = import('mqtt').IPublishPacket;

interface Prop {
  messageSelected: MQTTMessage;
  messageFormat: MessageFormatEnum;
  onClose: () => void;
}

export default function MessageDetailData ({
  messageSelected,
  messageFormat,
  onClose,
}: Prop) {
  const messagePacket: Packet = messageSelected.packet;

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader
          title={messagePacket.topic}
          subheader="MQTT Publish"
          action={
            <IconButton onClick={onClose} size="small" aria-label="cerrar">
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
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
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#0d1117' : '#f6f8fa',
              borderRadius: 1,
              overflowX: "auto",
            }}
          >
            <pre style={{ margin: 0, fontFamily: "inherit", fontSize: "0.875rem" }}>
              {DecoderService(messageSelected.data, messageFormat)}
            </pre>
          </Paper>
          
          <Box sx={{ pt: '10px', pb: '10px'}}>
            <RepresentationDataTypeSelector />
          </Box>
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