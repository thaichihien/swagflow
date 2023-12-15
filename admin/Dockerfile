FROM node:18-alpine3.17 as build

WORKDIR /app
COPY . /app

RUN npm install --legacy-peer-deps
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/build /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]