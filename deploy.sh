#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Iniciando deploy...${NC}"

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}Erro: package.json não encontrado. Certifique-se de estar no diretório correto.${NC}"
    exit 1
fi

echo -e "${YELLOW}Atualizando código do GitHub...${NC}"
git pull

echo -e "${YELLOW}Limpando cache do npm...${NC}"
npm cache clean --force

echo -e "${YELLOW}Removendo node_modules...${NC}"
rm -rf node_modules

echo -e "${YELLOW}Instalando dependências...${NC}"
npm install

echo -e "${YELLOW}Fazendo build de produção...${NC}"
npm run build

echo -e "${YELLOW}Reiniciando aplicação com PM2...${NC}"
pm2 delete bebabyblog || true
pm2 start npm --name "bebabyblog" --cwd "$(pwd)" -- start
pm2 save

echo -e "${GREEN}Deploy finalizado com sucesso!${NC}"
echo -e "${YELLOW}Verificando status da aplicação...${NC}"
pm2 list 