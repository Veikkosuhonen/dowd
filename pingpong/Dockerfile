FROM node:23-alpine3.21

COPY package* ./
RUN npm ci -f --omit-dev --ignore-scripts
COPY . .

CMD [ "npm", "run", "start" ]