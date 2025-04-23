# Használj hivatalos Nginx image-t
FROM nginx:alpine

# Másold be az Angular buildelt fájlokat a Nginx default könyvtárába
COPY ./dist/ /usr/share/nginx/html

# Másold be az egyedi Nginx konfigurációt, ha van
# COPY nginx.conf /etc/nginx/nginx.conf

# Állítsd be a megfelelő portot, amin a konténer futni fog
EXPOSE 80

# Indítsd el az Nginx-et
CMD ["nginx", "-g", "daemon off;"]

