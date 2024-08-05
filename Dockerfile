FROM node:21-alpine

WORKDIR /var/www/html

COPY package*.json .

RUN npm i 

COPY . .

EXPOSE 3000
