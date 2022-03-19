FROM node:latest

WORKDIR /usr/src/app

COPY ./dist /usr/src/app

RUN yarn install && \
    yarn build && \
    yarn build:server

EXPOSE 81
CMD ["node", "server.js"]
