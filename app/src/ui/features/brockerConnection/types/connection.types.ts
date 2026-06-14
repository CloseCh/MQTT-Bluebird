export interface ConnectionContextValue {
  isConnected: boolean;
  connectedEndpoint: string | null;
  handleConnection: (endpoint: string, username?: string, password?: string) => Promise<boolean>;
  handleDisconnection: () => Promise<void>;
}

type MQTT = 'mqtt' | 'mqtts';

type WEBSOCKETS = | 'ws' | 'wss';

export type MqttProtocol =  MQTT | WEBSOCKETS;

export interface ConnectionFormValues {
  endpoint: string;
};

export interface ConnectionFormValues {
  protocol: MqttProtocol;
  host: string;
  port: string;
  path?: string;
  username?: string;
  password?: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export const CONNECTION_STORAGE_KEY = 'mqtt-bluebird:connection-form';
export type StoredConnection = Omit<ConnectionFormValues, 'password'>;