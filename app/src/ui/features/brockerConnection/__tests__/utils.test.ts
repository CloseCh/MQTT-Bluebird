import { describe, it, expect } from 'vitest'
import type { ConnectionFormValues, MqttProtocol } from '../types/connection.types'
import { buildEndpoint, validateHost, validatePort } from '../utils/utils'

const conn = (protocol: MqttProtocol, host: string, port: string): ConnectionFormValues =>
  ({ endpoint: '', protocol, host, port })

describe('buildEndpoint', () => {
  it('builds mqtt endpoint', () => {
    expect(buildEndpoint(conn('mqtt', 'localhost', '1883'))).toBe('mqtt://localhost:1883')
  })

  it('builds mqtts endpoint', () => {
    expect(buildEndpoint(conn('mqtts', 'broker.example.com', '8883'))).toBe(
      'mqtts://broker.example.com:8883'
    )
  })

  it('builds ws endpoint', () => {
    expect(buildEndpoint(conn('ws', '127.0.0.1', '9001'))).toBe('ws://127.0.0.1:9001')
  })

  it('builds wss endpoint', () => {
    expect(buildEndpoint(conn('wss', 'broker.example.com', '443'))).toBe(
      'wss://broker.example.com:443'
    )
  })
})

describe('validateHost', () => {
  it('returns true for localhost', () => {
    expect(validateHost('localhost')).toBe(true)
  })

  it('returns true for an IP address', () => {
    expect(validateHost('192.168.1.1')).toBe(true)
  })

  it('returns true for domain with dots and dashes', () => {
    expect(validateHost('broker.example-server.com')).toBe(true)
  })

  it('returns error for empty string', () => {
    expect(validateHost('')).toBe('El host es obligatorio.')
  })

  it('returns error for whitespace-only string', () => {
    expect(validateHost('   ')).toBe('El host es obligatorio.')
  })

  it('returns error for host with embedded spaces', () => {
    expect(validateHost('my host')).toBe(
      'Host inválido. Usa un nombre de dominio o dirección IP.'
    )
  })

  it('returns true for underscore in host (underscore is in the allowed charset)', () => {
    expect(validateHost('my_broker')).toBe(true)
  })

  it('returns error for @ character', () => {
    expect(validateHost('user@host')).toBe(
      'Host inválido. Usa un nombre de dominio o dirección IP.'
    )
  })
})

describe('validatePort', () => {
  it('returns true for port 1 (min valid)', () => {
    expect(validatePort('1')).toBe(true)
  })

  it('returns true for port 1883', () => {
    expect(validatePort('1883')).toBe(true)
  })

  it('returns true for port 65535 (max valid)', () => {
    expect(validatePort('65535')).toBe(true)
  })

  it('returns error for port 0', () => {
    expect(validatePort('0')).toBe('Puerto inválido (1–65535).')
  })

  it('returns error for port 65536', () => {
    expect(validatePort('65536')).toBe('Puerto inválido (1–65535).')
  })

  it('returns error for negative port', () => {
    expect(validatePort('-1')).toBe('Puerto inválido (1–65535).')
  })

  it('returns error for float (1.5 is not integer)', () => {
    expect(validatePort('1.5')).toBe('Puerto inválido (1–65535).')
  })

  it('returns error for non-numeric string', () => {
    expect(validatePort('abc')).toBe('Puerto inválido (1–65535).')
  })

  it('returns error for empty string (Number("") = 0)', () => {
    expect(validatePort('')).toBe('Puerto inválido (1–65535).')
  })
})
