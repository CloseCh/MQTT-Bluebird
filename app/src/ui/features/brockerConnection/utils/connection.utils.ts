import {
  CONNECTIONS_STORAGE_KEY,
  CONNECTION_STORAGE_KEY,
  type ConnectionFormValues,
  type MqttProtocol,
  type SavedConnection,
  type StoredConnection,
} from '@/features/brockerConnection/types/connection.types';
import { DEFAULT_PORTS } from '@/features/brockerConnection/constants/connection.constants';

export function buildEndpoint(values: ConnectionFormValues): string {
  const base = `${values.protocol}://${values.host}:${values.port}`;
  const path = values.path?.trim();
  if (!path) return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function validateHost(value: string): true | string {
  const trimmed = value.trim();
  if (!trimmed) return 'El host es obligatorio.';
  const valid = /^[a-zA-Z0-9._-]+$/.test(trimmed);
  return valid || 'Host inválido. Usa un nombre de dominio o dirección IP.';
}

export function validatePort(value: string): true | string {
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1 || num > 65535) {
    return 'Puerto inválido (1–65535).';
  }
  return true;
}

function createId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `conn_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  }
}

/** Perfil por defecto para una conexión nueva (label vacío ⇒ se muestra host:port). */
export function createDefaultConnection(protocol: MqttProtocol): SavedConnection {
  return {
    id: createId(),
    label: '',
    protocol,
    host: 'localhost',
    port: DEFAULT_PORTS[protocol],
    path: '',
    username: '',
  };
}

/** Convierte un perfil guardado en valores de formulario (password siempre vacía). */
export function toFormValues(conn: SavedConnection): ConnectionFormValues {
  return {
    label: conn.label ?? '',
    protocol: conn.protocol,
    host: conn.host,
    port: conn.port,
    path: conn.path ?? '',
    username: conn.username ?? '',
    password: '',
  };
}

/** Convierte los valores actuales del formulario en un perfil guardable (sin password). */
export function toSavedConnection(id: string, values: Partial<ConnectionFormValues>): SavedConnection {
  return {
    id,
    label: values.label ?? '',
    protocol: values.protocol ?? 'mqtt',
    host: values.host ?? '',
    port: values.port ?? '',
    path: values.path,
    username: values.username,
  };
}

function loadLegacyConnection(): Partial<StoredConnection> {
  try {
    const raw = localStorage.getItem(CONNECTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<StoredConnection>) : {};
  } catch {
    return {};
  }
}

/** Carga los perfiles guardados; migra el formato antiguo y garantiza al menos uno. */
export function loadConnections(defaultProtocol: MqttProtocol): SavedConnection[] {
  try {
    const raw = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SavedConnection[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }

    // Migración desde el formato antiguo (una sola conexión).
    const legacy = loadLegacyConnection();
    if (legacy.host) {
      const protocol = legacy.protocol ?? defaultProtocol;
      return [{
        id: createId(),
        label: '',
        protocol,
        host: legacy.host,
        port: legacy.port ?? DEFAULT_PORTS[protocol],
        path: legacy.path,
        username: legacy.username,
      }];
    }
  } catch {
    // localStorage no disponible o JSON corrupto → perfil por defecto.
  }
  return [createDefaultConnection(defaultProtocol)];
}

export function saveConnections(connections: SavedConnection[]): void {
  try {
    localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(connections));
  } catch {
    // localStorage no disponible → no persistimos, sin romper el formulario.
  }
}

export function tabLabel(conn: SavedConnection): string {
  return conn.label.trim() || `${conn.host}:${conn.port}`;
}