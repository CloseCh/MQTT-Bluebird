import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  type ConnectionFormValues,
  type ConnectionStatus,
  type MqttProtocol,
} from "@/features/brockerConnection/types";
import { useConnectionContext } from "@/features/brockerConnection/hooks";
import { DEFAULT_PORTS } from "@/features/brockerConnection/constants";
import { useNavigate } from "react-router";

// ─── Helpers (privados al módulo) ─────────────────────────────────────────────

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

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useConnectionForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estado de conexión real viene del provider
  const { isConnected, connectedEndpoint, handleConnection, handleDisconnection } =
    useConnectionContext();

  const form = useForm<ConnectionFormValues>({
    defaultValues: {
      protocol: "mqtt",
      host: "localhost",
      port: DEFAULT_PORTS["mqtt"],
    },
  });

  const isConnecting = status === "connecting";

  const handleProtocolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const proto = e.target.value as MqttProtocol;
      form.setValue("protocol", proto);
      form.setValue("port", DEFAULT_PORTS[proto]);
    },
    [form]
  );

  const onSubmit = useCallback(async (data: ConnectionFormValues) => {
    setStatus("connecting");
    setErrorMessage(null);
    try {
      const success = await handleConnection(buildEndpoint(data));
      if (success) {
        navigate('/');
      } else {
        setStatus("error");
        setErrorMessage("No se pudo establecer la conexión...");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error desconocido.");
    }
  }, [handleConnection, navigate]);

  const onDisconnect = useCallback(async () => {
    try {
      await handleDisconnection();
    } finally {
      setStatus("disconnected");
      setErrorMessage(null);
    }
  }, [handleDisconnection]);

  const dismissError = useCallback(() => setErrorMessage(null), []);

  return {
    form,
    status,
    isConnected,
    isConnecting,
    errorMessage,
    connectedEndpoint,
    handleProtocolChange,
    onSubmit,
    onDisconnect,
    dismissError,
  };
}