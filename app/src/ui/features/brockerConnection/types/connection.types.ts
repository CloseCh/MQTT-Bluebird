export interface ConnectionContextValue {
  isConnected: boolean;
  connectedEndpoint: string | null;
  handleConnection: (endpoint: string, username?: string, password?: string) => Promise<boolean>;
  handleDisconnection: () => Promise<void>;
}

export interface ConnectionFormValues {
  endpoint: string;
};

export type MqttProtocol = 'mqtt' | 'mqtts' | 'ws' | 'wss';

export interface ConnectionFormValues {
  protocol: MqttProtocol;
  host: string;
  port: string;
  username?: string;
  password?: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
