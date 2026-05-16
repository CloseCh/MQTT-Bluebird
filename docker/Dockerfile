FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable && \
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

COPY --chown=appuser:appgroup app/package.json app/pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile --ignore-scripts

COPY --chown=appuser:appgroup app/ .
RUN pnpm build:web

FROM nginxinc/nginx-unprivileged:alpine
USER root
COPY --from=build /app/dist-web /usr/share/nginx/html
COPY docker/nginx.web.conf /etc/nginx/conf.d/default.conf
USER nginx

CMD ["nginx", "-g", "daemon off;"]
