FROM node:17-alpine

WORKDIR /usr/src/app

RUN mkdir /usr/src/app/dist

COPY ./dist /usr/src/app/dist
COPY ./node_modules /usr/src/app/node_modules

EXPOSE 81

CMD ["node", "dist/server.js"]
