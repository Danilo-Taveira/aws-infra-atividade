# Usar o servidor NGINX para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copiar o build já gerado localmente
COPY build /usr/share/nginx/html

# Copiar a configuração customizada do NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# Expor a porta
EXPOSE 80

# Rodar o servidor NGINX
CMD ["nginx", "-g", "daemon off;"]
