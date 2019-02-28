FROM node:10.15.1-alpine as builder

ENV NODE_ENV=production
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM abiosoft/caddy:0.11.0

EXPOSE 3000

COPY ./Caddyfile /etc/Caddyfile
COPY --from=builder /usr/app/build /var/www
