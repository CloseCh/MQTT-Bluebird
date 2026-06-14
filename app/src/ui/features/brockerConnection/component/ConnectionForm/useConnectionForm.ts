import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import type {
  ConnectionFormValues,
  ConnectionStatus,
  MqttProtocol,
} from '@/features/brockerConnection/types/connection.types';
import { useConnectionContext } from '@/features/brockerConnection/context/ConnectionProvider';
import { DEFAULT_PORTS } from '@/features/brockerConnection/constants/connection.constants';
import { useNavigate } from 'react-router';
import { buildEndpoint, validateHost, validatePort } from '../../utils/utils';

export function useConnectionForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { handleConnection } = useConnectionContext();

  const protocol: MqttProtocol = typeof window.electron === 'undefined' ? 'ws' : 'mqtt';
  const port = DEFAULT_PORTS[protocol];

  const form = useForm<ConnectionFormValues>({
    defaultValues: {
      protocol,
      host: 'localhost',
      port,
      username: '',
      password: '',
    },
  });

  const isConnecting = status === 'connecting';

  const handleProtocolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const proto = e.target.value as MqttProtocol;
      form.setValue('protocol', proto);
      form.setValue('port', DEFAULT_PORTS[proto]);
    }, [form]);

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