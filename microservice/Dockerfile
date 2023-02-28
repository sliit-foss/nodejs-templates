FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json esbuild.config.js pnpm-lock.yaml ./
COPY src ./src

RUN npm install -g pnpm && \
    pnpm install --production --ignore-scripts && \
    pnpm build

FROM node:16-alpine

WORKDIR /usr/app

COPY package.json migrate-mongo-config.js ./
COPY database/mongo/migrations migration_scripts
COPY --from=builder /usr/app/dist dist
COPY --from=builder /usr/app/node_modules node_modules

RUN sed -i 's/src\/database\/mongo\/migrations/migration_scripts/g' migrate-mongo-config.js

EXPOSE 8080

CMD node dist/index.js --enable-source-maps