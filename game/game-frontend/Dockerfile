FROM node:18.13

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN ng build

EXPOSE 8081

CMD ["ng","serve"]
