import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Chip, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import type { IPublishPacket } from 'mqtt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close';

import type { MessageFormatEnum } from '../../../types/mqtt.types';
import DecoderService from '../../../service/DecorderService';
import RepresentationDataTypeSelector from '../../RepresentationDataTypeSelector/RepresentationDataTypeSelector';
import { Box } from '@mui/material';
import { CODE_SURFACE } from '@/theme';
import { DeleteRetainButton } from '@/features/messagePublish';

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
  const messagePacket: IPublishPacket = messageSelected.packet;
  
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader
          title={messagePacket.topic}
          subheader='MQTT Publish'
          action={
            <IconButton onClick={onClose} size='small' aria-label='cerrar'>
              <CloseIcon fontSize='small' />
            </IconButton>
          }
        />
        <CardContent>

          {/* Flags */}
          <Stack direction='row' spacing={1} mb={2}>
            <Chip label={`QoS ${messagePacket.qos}`} color='primary' size='small' />
            {messagePacket.dup && <Chip label='DUP' size='small' />}
            {messagePacket.retain && <Chip label='RETAIN' color='warning' size='small' />}
          </Stack>

          {/* Message decodificado */}
          <Typography variant='subtitle2' color='text.secondary' mt={2} mb={0.5}>
            Message
          </Typography>
          <Paper
            variant='outlined'
            sx={{
              p: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? CODE_SURFACE.dark : CODE_SURFACE.light,
              borderRadius: 1,
              overflowX: 'auto',
            }}
          >
            <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: '0.875rem' }}>
              {DecoderService(messageSelected.data, messageFormat)}
            </pre>
          </Paper>

          <Box sx={{ pt: '10px', pb: '10px'}}>
            <RepresentationDataTypeSelector />
          </Box>

          <Box sx={{ pt: '10px', pb: '10px'}}>
            <DeleteRetainButton disabled={!messagePacket.retain}/>
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
                      <ListItemText primary={key} secondary={typeof value === 'object' ? JSON.stringify(value) : String(value)} />
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