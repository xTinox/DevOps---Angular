FROM node:18-alpine AS builder
WORKDIR app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.25.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/game-frontend /usr/share/nginx/html


