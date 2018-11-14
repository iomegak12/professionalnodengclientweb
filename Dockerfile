FROM mhart/alpine-node:latest

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT node src/server.js