# Stage 1 - Build
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2 - Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/<angular-project-neve> /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
