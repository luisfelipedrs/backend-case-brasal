## ❯ Projeto

Desenvolvimento de API Rest para uma aplicação de gerenciamento de tarefas com endpoints para criar, deletar, atualizar e ler, além dos endpoints de login e registro de usuários.

### Tecnologias utilizadas

- Typescript
- ExpressJS
- Nodemon
- MongoDB, Mongoose e Atlas
- Swagger OpenApi
- Testes com Jest e Supertest

## ❯ Começando

### Step 1: Configurar ambiente

## Instalar [Node.js e NPM](https://nodejs.org/en/download/)

## Fazer uma conta no [Atlas](https://www.mongodb.com/cloud/atlas/register) ou subir banco de dados MongoDB em docker

## Criar arquivo .env com as seguintes propriedades:

- DB_USER=
- DB_PASS=
- DB_URL=
- APP_PORT=
- JWT_SECRET=

### Step 2: Instalar dependências

```bash
npm install
```

### Step 3: Subir aplicação

```bash
npm run dev
```

## ❯ Endpoints

| Route                | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| **/api/v1/tasks**    | GET - Retorna uma lista paginada com todas as tarefas cadastradas  |
| **/api/v1/tasks**    | POST - Registra uma nova tarefa                                    |
| **/api/v1/tasks/id** | PATCH - Atualiza o status de uma tarefa                            |
| **/api/v1/tasks/id** | PUT - Atualiza a descrição e o status de uma tarefa                |
| **/api/v1/tasks/id** | DELETE - Deleta uma tarefa                                         |
| **/api/v1/register** | POST - Registra um novo usuário                                    |
| **/api/v1/login**    | POST - Retorna uma lista paginada com todas as tarefas cadastradas |
