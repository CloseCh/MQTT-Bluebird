import type { MessageFormatEnum, MQTTMessageList, TableType } from '@/features/messageRepresentacion';

export const NUM_FORMATS: MessageFormatEnum[] = ['int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64'];

export const TEXT_FORMATS: MessageFormatEnum[]  = ['UTF-8', 'ASCIICode', 'HEX'];

export const FLASH_DURATION = 1500;

export const EMPTY_MESSAGE: MQTTMessageList = { messageList: [], format: 'UTF-8' };


export const TABLE_OPTIONS: { type: TableType; label: string }[] = [
  { type: 'history', label: 'Histórico de mensaje'    },
  { type: 'topic',   label: 'Topic por suscripción'   },
  { type: 'last',    label: 'Orden de llegada'         },
];