FROM node:alpine

WORKDIR /app-frontend

COPY package* ./

RUN npm install

COPY ./ ./

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
