FROM node:17-alpine

WORKDIR /usr/src/app

RUN mkdir /usr/src/app/dist && \
    chown -R node:node /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN yarn install

EXPOSE 4242

CMD ["node", "dist/server.js"]
