# Az alap image legyen NGINX
FROM nginx:alpine

# Másold a buildelt Angular fájlokat a NGINX statikus fájl mappájába
COPY dist/pigapp-frontend-project/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
# Indítsd el az NGINX-et
CMD ["nginx", "-g", "daemon off;"]



