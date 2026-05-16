FROM node:22-alpine AS build
WORKDIR /app

# Activar pnpm vía corepack (no necesitas instalarlo global)
RUN corepack enable

# Copiar manifests primero para cachear la capa de deps
COPY app/package.json app/pnpm-lock.yaml ./

# --ignore-scripts: salta postinstall de electron/esbuild
# --prod=false: necesitas devDependencies para el build (vite, etc.)
RUN pnpm i --frozen-lockfile --ignore-scripts

COPY app/ .
RUN pnpm build:web

# Stage final: solo nginx con los assets
FROM nginx:alpine
COPY --from=build /app/dist-web /usr/share/nginx/html
# Si tienes config custom de nginx:

COPY nginx.web.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]