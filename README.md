# Auto Repair Web

Este projeto é uma aplicação web para oficinas mecânicas, criada com Next.js e NextAuth.js para autenticação.

## O que o Auto Repair atende?

- Oficinas mecânicas que desejam gerenciar clientes, serviços, ordens de serviço e histórico de atendimentos.
- Permite cadastro de usuários, autenticação, controle de acesso e gerenciamento de dados dos clientes e veículos.
- Interface moderna e responsiva, fácil de usar tanto em desktop quanto em dispositivos móveis.

## Como rodar localmente

1.  **Pré-requisitos:**

    - Node.js instalado (versão recomendada 18 ou superior)
    - npm ou yarn
    - Docker e Docker Compose instalados

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração do Banco de Dados com Docker:**

    - Certifique-se de ter o Docker e o Docker Compose instalados e em execução.
    - Navegue até a raiz do projeto (`/Users/morgado/Desktop/auto_repair/web/`).
    - Execute o seguinte comando para iniciar o contêiner do PostgreSQL:
      ```bash
      docker-compose up -d
      ```
    - Verifique se o contêiner está em execução:
      ```bash
      docker-compose ps
      ```

4.  **Configuração do Prisma:**

    - Após o banco de dados estar em execução via Docker, aplique as migrações do Prisma:
      ```bash
      npx prisma migrate dev
      ```
    - Se houver dados iniciais (seed), execute o comando para popular o banco de dados:
      ```bash
      npx prisma db seed
      ```
    - Gere o Prisma Client:
      ```bash
      npx prisma generate
      ```

5.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

6.  **Acesse no navegador:**
    - Abra [http://localhost:3000](http://localhost:3000)
    - Para acessar o sistema interno, acesse [http://localhost:3000/signin](http://localhost:3000/signin)

## Observações

- O sistema utiliza autenticação via NextAuth.js. Certifique-se de configurar as variáveis de ambiente necessárias se for usar provedores externos.
- O backend de autenticação está configurado para `http://localhost:3000/auth/login` (veja o arquivo `src/app/api/auth/[...nextauth]/route.ts`).
- Para funcionamento completo, é necessário que o backend esteja rodando na porta 3000.
