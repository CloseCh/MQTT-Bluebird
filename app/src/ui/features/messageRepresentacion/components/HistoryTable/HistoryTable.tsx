import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMQTTContext } from '../../hooks/useMQTTContext';
import DecoderService from '../../service/DecorderService';
import type { MessageFormatEnum, MQTTMessageList } from '../../types/mqtt.types';

interface Column {
  id: 'time' | 'content' | 'qos' | 'retention' | 'density';
  label: string;
  width?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'time',      label: 'TimeStamp', width: 75  },
  { id: 'content',   label: 'Content',   width: 250 },
  { id: 'qos',       label: 'QoS',       width: 50  },
  { id: 'retention', label: 'Retention', width: 50 },
];
const truncateStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  borderRight: '1px solid',
  borderLeft: '1px solid',
  borderColor: 'divider',
} as const;

interface Prop {
  handleClick: (message: MQTTMessage) => void;
}

function HistoryTable({ handleClick }: Prop) {
  const { getSelectedTopic, getTypedMessageList } = useMQTTContext(); 

  const selectedTopic = getSelectedTopic();

  const message: MQTTMessageList = getTypedMessageList(selectedTopic);

  const messageFormat: MessageFormatEnum = message.format;

  return (
    <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: '100%', overflowX: 'auto', border: '1px solid', borderColor: 'divider' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ tableLayout: 'fixed', minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ width: column.width, ...truncateStyles }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {message.messageList.map((message) => (
              <TableRow 
                hover 
                role="checkbox" 
                tabIndex={-1} 
                key={message.timeStamp}
                onClick={() => handleClick(message)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell sx={truncateStyles}>{message.timeStamp}</TableCell>
                <TableCell sx={truncateStyles}>{DecoderService(message.data, messageFormat)}</TableCell>
                <TableCell sx={truncateStyles}>{message.packet.qos}</TableCell>
                <TableCell sx={truncateStyles}>{message.packet.retain ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const HistoryTableMemo = React.memo(HistoryTable);

export { HistoryTableMemo as HistoryTable };