FROM node:17

WORKDIR /usr/src/app

RUN mkdir /usr/src/app/dist && \
    chown -R node:node /usr/src/app

COPY --chown=node:node ./dist /usr/src/app/dist

COPY --chown=node:node package.json /usr/src/app/package.json
COPY --chown=node:node yarn.lock /usr/src/app/yarn.lock

RUN yarn install

EXPOSE 4242

CMD ["node", "dist/server.js"]
