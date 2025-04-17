FROM node:23-alpine3.21

WORKDIR /usr/src/app

COPY . .
RUN npm ci
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
