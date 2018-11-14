FROM mhart/alpine-node:latest

COPY . /app

WORKDIR /app

EXPOSE 3000

ENTRYPOINT node src/server.js