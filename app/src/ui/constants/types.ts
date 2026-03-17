export type MessageDecodedReturns = string;
export const Message_NUMERIC_TYPES = ['int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64'] as const;
export type MessageNumericType = typeof Message_NUMERIC_TYPES[number];
export type MessageTypes = 'string' | 'hex' | 'json' | 'utf8' | 'ascii' | MessageNumericType;