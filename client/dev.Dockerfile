FROM node:10.15.1-alpine

ENV NODE_ENV=development
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start"]