FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY migrate-and-start.sh .

CMD ["./migrate-and-start.sh"]