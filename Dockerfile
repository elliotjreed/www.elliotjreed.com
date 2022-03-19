FROM node:17-alpine

WORKDIR /usr/src/app

COPY --chown=node:node ./dist /usr/src/app/dist

RUN mkdir /usr/src/app/dist && \
    mkdir /usr/src/app/node_modules && \
    chown -R node:node /usr/src/app && \
    yarn install --production --frozen-lockfile

EXPOSE 81

CMD ["node", "dist/server.js"]
