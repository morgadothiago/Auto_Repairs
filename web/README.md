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
   - Docker e Docker Compose instalados (para rodar o banco de dados)

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuração do Banco de Dados com Docker:**
   - Certifique-se de que o Docker esteja em execução.
   - Copie o arquivo `.env.example` para `.env` na raiz do projeto e configure suas variáveis de ambiente, especialmente `DATABASE_URL` para apontar para o seu contêiner Docker (ex: `postgresql://user:password@localhost:5432/mydatabase`).
   - Inicie o contêiner do banco de dados PostgreSQL usando Docker Compose:
     ```bash
     docker-compose up -d
     ```
   - Execute as migrações do Prisma para criar as tabelas no banco de dados:
     ```bash
     npx prisma migrate dev
     ```
   - (Opcional) Se você tiver dados iniciais para popular o banco de dados, execute o seed:
     ```bash
     npx prisma db seed
     ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse no navegador:**
   - Abra [http://localhost:3000](http://localhost:3000)
   - Para autenticação, acesse [http://localhost:3000/signin](http://localhost:3000/signin)

## Observações

- O sistema utiliza autenticação via NextAuth.js. Certifique-se de configurar as variáveis de ambiente necessárias se for usar provedores externos.
- O backend de autenticação está configurado para `http://localhost:3001/auth/login` (veja o arquivo `src/app/api/auth/[...nextauth]/route.ts`).
- Para funcionamento completo, é necessário que o backend esteja rodando na porta 3001.
