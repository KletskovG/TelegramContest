FROM node:12-alpine

WORDIR /app

COPY ./ /app

RUN npm install 
CMD ["node", "server.js"]
