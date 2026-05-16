import { createElectronIPCTransport } from './ElectronIPCTransport';
import { createMQTTDirectTransport } from './MQTTDirectTransport';
import type { MQTTTransport } from '../types/transport.types';

export function createTransport(): MQTTTransport {
  if (typeof window !== 'undefined' && window.electron) {
    return createElectronIPCTransport();
  }
  return createMQTTDirectTransport();
}
