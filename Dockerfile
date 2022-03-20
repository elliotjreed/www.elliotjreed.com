FROM node:17

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN yarn install && \
    yarn build && \
    yarn build:server

EXPOSE 80

CMD ["node", "dist/server.js"]
