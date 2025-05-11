# Az alap image legyen NGINX (kis méretű Alpine)
FROM nginx:alpine

# Másold a buildelt Angular fájlokat a NGINX statikus fájl mappájába
COPY dist/pigapp-frontend-project/browser/ /usr/share/nginx/html/

# Másold az Nginx konfigurációt
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Hozd létre az SSL tanúsítványok mappáit
RUN mkdir -p /etc/ssl/certs
RUN mkdir -p /etc/ssl/private

# Másold be a self-signed tanúsítványt és kulcsot
COPY selfsigned.crt /etc/ssl/certs/selfsigned.crt
COPY selfsigned.key /etc/ssl/private/selfsigned.key

# Indítsd el az NGINX-et
CMD ["nginx", "-g", "daemon off;"]



