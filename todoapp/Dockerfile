FROM node:23-alpine3.21

WORKDIR /opt/app-root/src

COPY . .
RUN npm ci
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
