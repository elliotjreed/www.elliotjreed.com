FROM node:17-alpine

WORKDIR /usr/src/app

COPY ./dist /usr/src/app

EXPOSE 81
CMD ["node", "server.js"]
