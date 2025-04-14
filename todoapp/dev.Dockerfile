FROM node:latest

WORKDIR /opt/app-root/src

COPY . .
RUN npm ci

CMD [ "npm", "run", "start:dev" ]