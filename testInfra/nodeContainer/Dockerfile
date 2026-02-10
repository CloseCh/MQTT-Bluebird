FROM node:25.6-alpine

WORKDIR /app

COPY ./node-publisher .

RUN npm install -g pnpm@latest-10

RUN CI=true pnpm i

RUN apk add --no-cache curl dumb-init && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

CMD ["dumb-init", "node", "index.js"]