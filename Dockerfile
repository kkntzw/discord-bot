# TypeScript を JavaScript へトランスパイルする。
FROM node:14.16.0-alpine AS build

LABEL version="0.2.0"
LABEL maintainer="kkntzw"

WORKDIR /var/tmp/
COPY . .
RUN npm ci && \
    npm run compile

# 開発用パッケージを除いた依存先をダウンロードする。
FROM node:14.16.0-alpine

WORKDIR /usr/src/
COPY --from=build /var/tmp/dist/ ./dist/
COPY --from=build /var/tmp/package.json ./package.json
COPY --from=build /var/tmp/package-lock.json ./package-lock.json
RUN npm ci --production

ENTRYPOINT [ "npm", "start" ]
