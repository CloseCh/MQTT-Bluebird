import { CONNECTION_STORAGE_KEY, type ConnectionFormValues, type StoredConnection } from '@/features/brockerConnection/types/connection.types';

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

export function loadStoredConnection(): Partial<StoredConnection> {
  try {
    const raw = localStorage.getItem(CONNECTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<StoredConnection>) : {};
  } catch {
    // localStorage no disponible (modo privado, deshabilitado…) o JSON corrupto.
    return {};
  }
}

export function saveStoredConnection(values: Partial<ConnectionFormValues>): void {
  try {
    const toStore: Partial<StoredConnection> = {
      protocol: values.protocol,
      host: values.host,
      port: values.port,
      path: values.path,
      username: values.username,
    };
    localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // localStorage no disponible → no persistimos, sin romper el formulario.
  }
}