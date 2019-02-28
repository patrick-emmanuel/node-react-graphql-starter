FROM node:10.15.1-alpine

ENV NODE_ENV=development

WORKDIR /usr/app

COPY package*.json ./
RUN npm install && npm install -g prisma

COPY . .

CMD [ "npm", "run", "dev"]
