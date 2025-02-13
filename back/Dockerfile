# Usar uma imagem base do Node
FROM node:18

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar o arquivo de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar os arquivos restantes do projeto
COPY . .

# A porta que será exposta pelo contêiner
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["node", "src/server.js"]
