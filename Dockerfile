# Usa a imagem oficial do Bun (leve e rápida)
FROM oven/bun:latest

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package.json bun.lock ./

# Instala as dependências dentro do container
RUN bun install

# Copia todo o restante do código
COPY . .

# Expõe a porta que sua API usa
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["bun", "run", "src/server.ts"]