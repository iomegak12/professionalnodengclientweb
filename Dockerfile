FROM mhart/alpine-node:latest

COPY . /app

WORKDIR /app

RUN npm install

RUN npm install appdynamics@next

EXPOSE 3000

ENTRYPOINT node src/server.js