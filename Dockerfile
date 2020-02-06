FROM node:12 AS node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
RUN rm -rf node_modules

RUN npm i -g serve

CMD serve -l 80 -s build
