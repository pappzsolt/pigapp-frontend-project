# Az alap image legyen NGINX
FROM nginx:alpine

# Másold a buildelt Angular fájlokat a NGINX statikus fájl mappájába
COPY dist/pigapp-frontend-project/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Indítsd el az NGINX-et
CMD ["nginx", "-g", "daemon off;"]



