# COCAO_HOTEL_DDL_DML_CRUD
Trabalho Avaliativo Individual - PROGRAMAÇÃO PARA WEB 2


git config --global user.email "novais.oliveira@aluno.ifsp.edu.br"

git config --global user.name "lucasnovais01"


Como rodar o servidor/sistema, no CMD/terminal, exemplo:

PARA O NEST É
    npm run start:dev

PARA O REACTJS
    npm run dev


para testar no postman

{
    "idCidade": 1,
    "nomeCidade": "Araçatuba",
    "codCidade": "COD120"
}


Abrir o terminal (cmd) por exemplo aqui:
C:\Users\Lucas\Downloads\COCAO_HOTEL_DDL_DML_CRUD_ppw2\nest_academic e rodar:
 
Lista de instaladores (ordem correta):

# 1. Base do NestJS, pacotes principais do NestJS e as ferramentas de reflexão
npm install @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata rxjs

# 2. Tipos de desenvolvimento para o ambiente Node/Express (necessário para o TypeScript)
npm install --save-dev @types/node @types/express


# ORM e Conexão com o Banco de Dados Oracle:

# 3. Instala o módulo do TypeORM para NestJS
npm install @nestjs/typeorm

# 4. Instala o TypeORM (core ORM)
npm install typeorm

# 5. Instala o driver nativo do Oracle para Node.js
npm install oracledb

# 6. Instala as definições de tipo do TypeScript para o driver Oracle
npm install --save-dev @types/oracledb


# Configuração, Variáveis de Ambiente e Validação:

# 7. Instala o módulo oficial de configuração do NestJS
npm install @nestjs/config

# 8. Instala a biblioteca Joi, usada para validação de schema do .env
npm install joi

# 9. Instala as definições de tipo do TypeScript para o Joi
npm install --save-dev @types/joi

# Explicando, O @nestjs/config carrega o .env. O joi valida as variáveis de ambiente no app.module.ts. O @types/joi garante que o TypeScript entenda o joi.


# Validação e Transformação de DTOs:

# Adiciona funcionalidade de validação (regras @IsString(), @IsNumber(), etc.) aos DTOs
npm install class-validator

# Adiciona funcionalidade de transformação de objetos e DTOs
npm install class-transformer





/** Comentário do JSDoc (JavaScript Documentation) // tem que colocar dois asteriscos no começo
O VS Code lê JSDoc e transforma em dicas inteligentes (IntelliSense), só passar o mouse sobre o método.

