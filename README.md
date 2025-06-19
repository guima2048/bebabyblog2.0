# Bebaby Blog 2.0

Este é um projeto [Next.js](https://nextjs.org) para o blog Bebaby sobre relacionamentos Sugar.

## Como Iniciar

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

## Deploy em Produção

### Deploy Manual no Servidor

Para fazer deploy no servidor de produção:

```bash
# No servidor de produção
npm run deploy
# ou
bash deploy.sh
```

O script de deploy irá:
- Puxar as últimas alterações do GitHub
- Instalar dependências
- Fazer build de produção
- Reiniciar a aplicação com PM2

### Configuração do Servidor

O projeto está configurado para rodar em: `http://177.153.20.125:3000`

## Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Iniciar servidor de produção
- `npm run deploy` - Deploy completo no servidor
- `npm run lint` - Verificar código
- `npm run type-check` - Verificar tipos TypeScript

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- PM2 (Process Manager)
