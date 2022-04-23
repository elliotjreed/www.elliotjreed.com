FROM node:18

WORKDIR /usr/src/app

COPY --chown=node:node ./dist /usr/src/app/dist
COPY --chown=node:node ./node_modules /usr/src/app/node_modules

EXPOSE 81

WORKDIR /usr/src/app/dist

CMD ["node", "server.js"]
