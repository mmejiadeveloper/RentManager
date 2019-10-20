FROM node:9.2
LABEL maintainer="Miguel Mejia"
COPY package*.json ./


ENV NODE_ENV=production
ADD . /opt/node/RentManager
WORKDIR /opt/node/RentManager
COPY package.json /opt/node/RentManager

RUN npm install
EXPOSE 3667
CMD nodejs dist/app.js