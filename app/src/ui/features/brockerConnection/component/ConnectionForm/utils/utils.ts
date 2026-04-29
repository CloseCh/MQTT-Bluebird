import type { ConnectionFormValues } from "@/features/brockerConnection/types";

export function buildEndpoint(values: ConnectionFormValues): string {
  return `${values.protocol}://${values.host}:${values.port}`;
}

export function validateHost(value: string): true | string {
  const trimmed = value.trim();
  if (!trimmed) return "El host es obligatorio.";
  const valid = /^[a-zA-Z0-9._-]+$/.test(trimmed);
  return valid || "Host inválido. Usa un nombre de dominio o dirección IP.";
}

export function validatePort(value: string): true | string {
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1 || num > 65535) {
    return "Puerto inválido (1–65535).";
  }
  return true;
}