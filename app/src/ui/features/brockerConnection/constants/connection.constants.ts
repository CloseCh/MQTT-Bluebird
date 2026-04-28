import type { ConnectionStatus, MqttProtocol } from "../types";

export const PROTOCOLS: { value: MqttProtocol; label: string }[] = [
  { value: "mqtt", label: "mqtt://" },
  { value: "mqtts", label: "mqtts://" },
  { value: "ws", label: "ws://" },
  { value: "wss", label: "wss://" },
];

export const DEFAULT_PORTS: Record<MqttProtocol, string> = {
  mqtt: "1883",
  mqtts: "8883",
  ws: "8083",
  wss: "8084",
};

export const STATUS_COLORS: Record<
  ConnectionStatus,
  "default" | "warning" | "success" | "error"
> = {
  disconnected: "default",
  connecting: "warning",
  connected: "success",
  error: "error",
};

export const STATUS_LABELS: Record<ConnectionStatus, string> = {
  disconnected: "Desconectado",
  connecting: "Conectando…",
  connected: "Conectado",
  error: "Error",
};
