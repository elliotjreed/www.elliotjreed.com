FROM node:17

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

COPY --chown=node:node package.json /usr/src/app/package.json
COPY --chown=node:node yarn.lock /usr/src/app/yarn.lock

RUN yarn install && \
    yarn build && \
    yarn build:server

EXPOSE 4242

CMD ["node", "dist/server.js"]
