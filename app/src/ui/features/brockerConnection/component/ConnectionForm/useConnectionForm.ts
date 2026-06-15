import { useState, useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type {
  ConnectionFormValues,
  ConnectionStatus,
  MqttProtocol,
  SavedConnection,
} from '@/features/brockerConnection/types/connection.types';
import { useConnectionContext } from '@/features/brockerConnection/context/ConnectionProvider';
import { useNavigate } from 'react-router';
import {
  buildEndpoint,
  createDefaultConnection,
  loadConnections,
  saveConnections,
  toFormValues,
  toSavedConnection,
  validateHost,
  validatePort,
} from '../../utils/connection.utils';

export function useConnectionForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { handleConnection } = useConnectionContext();

  const defaultProtocol: MqttProtocol = typeof window.electron === 'undefined' ? 'ws' : 'mqtt';

  // Perfiles guardados (sin contraseña) y el perfil activo (tab seleccionado).
  const [connections, setConnections] = useState<SavedConnection[]>(() => loadConnections(defaultProtocol));
  const [activeId, setActiveId] = useState<string>(() => connections[0]?.id ?? '');
  // Ref para que el watch siempre persista sobre el perfil activo correcto,
  // evitando cierres obsoletos al cambiar de tab.
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const active = connections.find((c) => c.id === activeId)
    ?? connections[0]
    ?? createDefaultConnection(defaultProtocol);

  const form = useForm<ConnectionFormValues>({
    defaultValues: toFormValues(active),
  });

  // Auto-guardado: cada cambio del formulario persiste en el perfil activo.
  useEffect(() => {
    const subscription = form.watch((values) => {
      setConnections((prev) => {
        const id = activeIdRef.current;
        const next = prev.map((c) => (c.id === id ? toSavedConnection(id, values) : c));
        saveConnections(next);
        return next;
      });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const isConnecting = status === 'connecting';

  const handleProtocolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const proto = e.target.value as MqttProtocol;
      form.setValue('protocol', proto);
      form.setValue('port', createDefaultConnection(proto).port);
    }, [form]);

  const selectConnection = useCallback((id: string) => {
    const conn = connections.find((c) => c.id === id);
    if (!conn) return;
    setActiveId(id);
    activeIdRef.current = id;
    form.reset(toFormValues(conn));
  }, [connections, form]);

  const addConnection = useCallback(() => {
    const conn = createDefaultConnection(defaultProtocol);
    setConnections((prev) => {
      const next = [...prev, conn];
      saveConnections(next);
      return next;
    });
    setActiveId(conn.id);
    activeIdRef.current = conn.id;
    form.reset(toFormValues(conn));
  }, [defaultProtocol, form]);

  const removeConnection = useCallback((id: string) => {
    const filtered = connections.filter((c) => c.id !== id);
    const next = filtered.length > 0 ? filtered : [createDefaultConnection(defaultProtocol)];
    setConnections(next);
    saveConnections(next);
    const newActive = next[0];
    if (id === activeId && newActive) {
      setActiveId(newActive.id);
      activeIdRef.current = newActive.id;
      form.reset(toFormValues(newActive));
    }
  }, [connections, activeId, defaultProtocol, form]);

  const onSubmit = useCallback(async (data: ConnectionFormValues) => {
    setStatus('connecting');
    setErrorMessage(null);
    try {
      const success = await handleConnection(buildEndpoint(data), data.username, data.password);
      if (success) {
        void navigate('/');
      } else {
        setStatus('error');
        setErrorMessage('No se pudo establecer la conexión...');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Error desconocido.');
    }
  }, [handleConnection, navigate]);

  const dismissError = useCallback(() => setErrorMessage(null), []);

  return {
    form,
    connections,
    activeId,
    selectConnection,
    addConnection,
    removeConnection,
    status,
    isConnecting,
    errorMessage,
    validateHost,
    validatePort,
    handleProtocolChange,
    onSubmit,
    dismissError,
  };
}
