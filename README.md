<div align="center">

# 🐦 MQTT Bluebird

**Cliente de escritorio MQTT construido con Electron, React y TypeScript.**

Conéctate a brokers MQTT, suscríbete a tópicos, publica mensajes en múltiples formatos binarios y monitorea el estado del broker en tiempo real.

</div>

---

## Tabla de contenidos

- [Características](#características)
- [Formatos de datos soportados](#formatos-de-datos-soportados)
- [Arquitectura](#arquitectura)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Instalación y desarrollo](#instalación-y-desarrollo)
- [Scripts disponibles](#scripts-disponibles)
- [Infraestructura de pruebas](#infraestructura-de-pruebas)
- [Créditos](#créditos)

## Características

- **Conexión** — soporta los protocolos `mqtt`, `mqtts`, `ws` y `wss`, con autenticación opcional (usuario y contraseña). La última conexión se persiste en `localStorage`.
- **Suscripción** — gestión de suscripciones a tópicos con soporte de wildcards (`+`, `#`), detección de suscripciones duplicadas o cubiertas por un wildcard existente.
- **Publicación** — envío de mensajes con selección de formato de datos, nivel de QoS (0, 1, 2) y flag retain. Incluye acción para borrar mensajes retenidos.
- **Visualización de mensajes** — tres vistas para explorar los mensajes recibidos:
  - **History** — historial completo de mensajes por tópico.
  - **Topic** — último mensaje recibido por tópico.
  - **Last** — vista de los mensajes más recientes.
  - Cada mensaje se puede inspeccionar en un panel de detalle redimensionable, decodificándolo bajo demanda en cualquier formato.
- **Árbol de tópicos** — vista jerárquica que reconstruye el árbol de tópicos a partir de los segmentos (`/`) de los mensajes recibidos.
- **Broker Monitor** — panel de métricas en tiempo real vía tópicos `$SYS/broker/`: clientes, mensajes, bytes, suscripciones, heap, carga (1 min / 5 min / 15 min) y gráficos de series temporales.
- **Ajustes** — modo oscuro y límite configurable de mensajes por tópico.

## Formatos de datos soportados

Al publicar y al visualizar mensajes se pueden usar los siguientes formatos. La codificación (al publicar) y la decodificación (al visualizar) son simétricas y se aplican sobre el mismo `payload` binario:

| Formato | Descripción |
|---|---|
| UTF-8 / JSON | Texto plano o JSON con pretty-print automático |
| HEX | Cadena hexadecimal |
| ASCII codes | Lista de códigos decimales separados por espacios o comas |
| int8 / uint8 | Entero de 8 bits con/sin signo |
| int16 / uint16 | Entero de 16 bits big-endian |
| int32 / uint32 | Entero de 32 bits big-endian |
| int64 / uint64 | Entero de 64 bits big-endian |

## Arquitectura

La aplicación sigue la separación clásica de Electron entre el **proceso main** (Node.js, donde vive el cliente MQTT) y el **proceso renderer** (React), comunicados por una capa de transporte intercambiable.

```
┌──────────────────────────── Renderer (React) ────────────────────────────┐
│                                                                            │
│  Features (context + reducer/store + service por feature)                  │
│  ├─ brockerConnection   ├─ messagePublish      ├─ messageSubscription      │
│  ├─ brockerMonitor      ├─ messageRepresentacion (decodificación + tablas) │
│  └─ navigation                                                             │
│                                                                            │
│                      ▼ depende de la interfaz MQTTTransport ▼              │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  Transport Abstraction Layer  (ui/transport)                       │    │
│  │  createTransport()  →  ElectronIPCTransport | MQTTDirectTransport  │    │
│  └──────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────┬───────────────────────────────────────┘
                                      │ IPC (preload, contrato EventPayloadMapping)
┌─────────────────────────────────────▼──────────────────────────────────────┐
│  Main (Electron / Node.js)                                                  │
│  services/mqtt → connectClient · publisher · subscriptor · listeners        │
│  cliente `mqtt` 5 conectado al broker                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Capa de transporte intercambiable

Toda la UI depende de la interfaz **`MQTTTransport`** (`connect`, `publish`, `subscribe`, listeners de mensajes y de eventos del broker), nunca de una implementación concreta. `createTransport()` elige en tiempo de ejecución:

- **`ElectronIPCTransport`** — implementación por defecto en la app de escritorio. El cliente MQTT vive en el proceso main y la UI se comunica con él vía IPC (`window.electron`), con un contrato de payloads tipado (`EventPayloadMapping`) entre `preload` y `main`.
- **`MQTTDirectTransport`** — implementación alternativa que abre el cliente MQTT directamente desde el renderer (p. ej. al ejecutar fuera de Electron).

Esto mantiene cada feature agnóstica del entorno y facilita las pruebas.

### Organización por features

Cada feature en `app/src/ui/features/` es autocontenida y sigue el mismo patrón: `components/`, `context/` (provider + reducer), `service/` (hook que orquesta el transporte), `types/`, `constants/` y `utils/`. Los providers se componen en el arranque mediante `composeProviders` en `AppProviders`.

### Gestión de estado

- **React Context + reducer** para el estado de dominio con flujos complejos: conexión, suscripciones, representación de mensajes y monitor del broker.
- **Zustand** para estado de UI más simple y transversal: ajustes (`settingsStore`), navegación (`navigationStore`) y el formulario de publicación (`publishFormStore`).
- **react-hook-form** para la validación de los formularios de conexión y publicación.

## Stack tecnológico

- **Electron 41** — runtime de escritorio
- **React 19** + **TypeScript** — interfaz de usuario
- **electron-vite / Vite** — bundler y dev server
- **Material UI 7** — componentes visuales
- **Zustand** — gestión de estado global
- **react-hook-form** — manejo de formularios
- **recharts** — gráficos de series temporales
- **mqtt 5** — cliente MQTT para Node.js

## Requisitos

- Node.js ≥ 20
- pnpm ≥ 10

## Instalación y desarrollo

```bash
cd app
pnpm install
pnpm run dev
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm run dev` | Inicia la app en modo desarrollo con hot-reload |
| `pnpm run build` | Compila TypeScript y genera el bundle de producción |
| `pnpm run type:validate` | Valida los tipos sin emitir archivos |
| `pnpm run lint` | Ejecuta ESLint sobre el proyecto |
| `pnpm run dist:win` | Genera el instalador para Windows (x64) |
| `pnpm run dist:mac` | Genera el instalador para macOS (arm64) |
| `pnpm run dist:linux` | Genera el instalador para Linux (x64) |

## Infraestructura de pruebas

El directorio `testInfra/` contiene un entorno Docker para desarrollo y pruebas locales:

```bash
cd testInfra
docker compose up -d --build
```

Levanta tres servicios:

| Servicio | Puerto | Descripción |
|---|---|---|
| Mosquitto | `1883` (TCP) · `9001` (WebSocket) | Broker MQTT con acceso anónimo |
| MQTT Explorer | `4000` | UI web para inspeccionar el broker (admin/admin) |
| nodePublisher | — | Contenedor Node.js que publica mensajes de prueba en todos los formatos soportados (UTF-8/JSON, HEX, ASCII y numéricos) |

Para conectarse desde la app usar `localhost:1883` (protocolo `mqtt`) o `localhost:9001` (protocolo `ws`).

## Créditos

Icono de la aplicación por [Muhammad Adnan en vecteezy.com](https://www.vecteezy.com/vector-art/49246407-modern-stylized-bluebird-logo-design-perfect-for-a-brand-seeking-a-unique-and-fresh-identity).
