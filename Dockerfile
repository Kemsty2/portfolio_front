FROM node:12 AS node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
RUN rm -rf node_modules

FROM nginx:alpine
COPY --from=node /usr/src/app/build /usr/share/nginx/html
