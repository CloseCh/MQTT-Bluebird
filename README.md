# MQTT Bluebird

Cliente de escritorio MQTT construido con Electron, React y TypeScript. Permite conectarse a brokers MQTT, suscribirse a tópicos, publicar mensajes en múltiples formatos y monitorear el estado del broker en tiempo real.

## Características

- **Conexión** — soporta los protocolos `mqtt`, `mqtts`, `ws` y `wss`, con autenticación opcional (usuario y contraseña).
- **Suscripción** — gestión de suscripciones a tópicos con soporte de wildcards (`+`, `#`).
- **Publicación** — envío de mensajes con selección de formato de datos, nivel de QoS (0, 1, 2) y flag retain.
- **Visualización de mensajes** — tres vistas para explorar los mensajes recibidos:
  - **History** — historial completo de mensajes por tópico.
  - **Topic** — último mensaje recibido por tópico.
  - **Last** — vista de los mensajes más recientes.
- **Broker Monitor** — panel de métricas en tiempo real vía tópicos `$SYS/broker/`: clientes, mensajes, bytes, suscripciones, heap, carga (1 min / 5 min / 15 min) y gráficos de series temporales.
- **Ajustes** — modo oscuro y límite configurable de mensajes por tópico.

## Formatos de datos soportados

Al publicar y al visualizar mensajes se pueden usar los siguientes formatos:

| Formato | Descripción |
|---|---|
| UTF-8 / JSON | Texto plano o JSON con pretty-print automático |
| HEX | Cadena hexadecimal |
| ASCII codes | Lista de códigos decimales separados por espacios o comas |
| int8 / uint8 | Entero de 8 bits con/sin signo |
| int16 / uint16 | Entero de 16 bits big-endian |
| int32 / uint32 | Entero de 32 bits big-endian |
| int64 / uint64 | Entero de 64 bits big-endian |

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
pnpm dev
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia la app en modo desarrollo con hot-reload |
| `pnpm build` | Compila TypeScript y genera el bundle de producción |
| `pnpm type:validate` | Valida los tipos sin emitir archivos |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto |
| `pnpm dist:win` | Genera el instalador para Windows (x64) |
| `pnpm dist:mac` | Genera el instalador para macOS (arm64) |
| `pnpm dist:linux` | Genera el instalador para Linux (x64) |

## Infraestructura de pruebas

El directorio `testInfra/` contiene un entorno Docker para desarrollo y pruebas locales:

```bash
cd testInfra
docker compose up
```

Levanta tres servicios:

| Servicio | Puerto | Descripción |
|---|---|---|
| Mosquitto | `1883` (TCP) · `9001` (WebSocket) | Broker MQTT con acceso anónimo |
| MQTT Explorer | `4000` | UI web para inspeccionar el broker (admin/admin) |
| nodePublisher | — | Contenedor Node.js que publica mensajes de prueba |

Para conectarse desde la app usar `localhost:1883` (protocolo `mqtt`) o `localhost:9001` (protocolo `ws`).

## Créditos

Icono de la aplicación por [Muhammad Adnan en vecteezy.com](https://www.vecteezy.com/vector-art/49246407-modern-stylized-bluebird-logo-design-perfect-for-a-brand-seeking-a-unique-and-fresh-identity).
