# Az alap image legyen NGINX
FROM nginx:alpine

# Másold a buildelt Angular fájlokat a NGINX statikus fájl mappájába
COPY dist/pigapp-frontend-project/ /usr/share/nginx/html/

# Indítsd el az NGINX-et
CMD ["nginx", "-g", "daemon off;"]


