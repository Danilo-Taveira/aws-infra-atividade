FROM nginx:stable-alpine

# Copia o build já existente
COPY build/ /usr/share/nginx/html/

# Copia a configuração do NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
