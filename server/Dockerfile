FROM node:20-alpine3.20

WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g typescript

COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./package.json ./package.json

RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000


CMD [ "pnpm","start" ]