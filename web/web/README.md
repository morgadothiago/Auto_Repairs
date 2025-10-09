# Auto Repair Web

Este projeto é uma aplicação web para oficinas mecânicas, criada com Next.js e NextAuth.js para autenticação.

## O que o Auto Repair atende?

- Oficinas mecânicas que desejam gerenciar clientes, serviços, ordens de serviço e histórico de atendimentos.
- Permite cadastro de usuários, autenticação, controle de acesso e gerenciamento de dados dos clientes e veículos.
- Interface moderna e responsiva, fácil de usar tanto em desktop quanto em dispositivos móveis.

## Como rodar localmente

1. **Pré-requisitos:**
   - Node.js instalado (versão recomendada 18 ou superior)
   - npm ou yarn

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse no navegador:**
   - Abra [http://localhost:3000](http://localhost:3000)
   - Para autenticação, acesse [http://localhost:3000/signin](http://localhost:3000/signin)

## Observações

- O sistema utiliza autenticação via NextAuth.js. Certifique-se de configurar as variáveis de ambiente necessárias se for usar provedores externos.
- O backend de autenticação está configurado para `http://localhost:3001/auth/login` (veja o arquivo `src/app/api/auth/[...nextauth]/route.ts`).
- Para funcionamento completo, é necessário que o backend esteja rodando na porta 3001.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
