FROM node:20-alpine as BUILDER

ENV VITE_MAIN_ENDPOINT=https://hack.noxly.ru/api
ENV VITE_SOCKET_ENDPOINT=https://ws.hack.noxly.ru/api/ws

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn config set network-timeout 600000 -g  # Устанавливаем таймаут
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=BUILDER /app /app/
CMD ["yarn", "preview"]

EXPOSE 3000
