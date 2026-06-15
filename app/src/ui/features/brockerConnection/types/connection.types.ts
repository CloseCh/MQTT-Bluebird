export interface ConnectionContextValue {
  isConnected: boolean;
  /** Estado de la conexión: 'error' indica caída inesperada del broker. */
  status: ConnectionStatus;
  connectedEndpoint: string | null;
  handleConnection: (endpoint: string, username?: string, password?: string) => Promise<boolean>;
  handleDisconnection: () => Promise<void>;
}

type MQTT = 'mqtt' | 'mqtts';

type WEBSOCKETS = | 'ws' | 'wss';

export type MqttProtocol =  MQTT | WEBSOCKETS;

export interface ConnectionFormValues {
  /** Nombre del perfil. Vacío ⇒ se muestra host:port automáticamente. */
  label: string;
  protocol: MqttProtocol;
  host: string;
  port: string;
  path?: string;
  username?: string;
  password?: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

/** Perfil de conexión guardado (nunca incluye la contraseña). */
export interface SavedConnection extends Omit<ConnectionFormValues, 'password'> {
  id: string;
}

// Clave nueva: array de perfiles.
export const CONNECTIONS_STORAGE_KEY = 'mqtt-bluebird:connections';
// Clave antigua: una sola conexión. Se mantiene solo para migrar.
export const CONNECTION_STORAGE_KEY = 'mqtt-bluebird:connection-form';
export type StoredConnection = Omit<ConnectionFormValues, 'password' | 'label'>;