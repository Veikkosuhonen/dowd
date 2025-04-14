FROM node:latest

COPY package* ./
RUN npm ci -f --omit-dev --ignore-scripts
COPY . .

CMD [ "npm", "run", "start" ]