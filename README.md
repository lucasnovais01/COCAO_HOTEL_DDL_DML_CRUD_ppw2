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


Lista do instaladores:

nest:

npm i @nestjs/typeorm --save

# Para integrar com Oracle via TypeORM:
npm i oracledb --save

npm i class-transformer --save
npm i class-validator --save

# Para ler .env e validar variáveis com Joi:
npm i @nestjs/config joi --save

para instalar esta biblioteca


-------------------------
npm i class-transformer --save
npm i @nest/swagger --save
npm i swagger-ui-express --save
npm i class-transformer --save
--------------------------


dica de instalador:

# 1. Base do NestJS
npm install @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata rxjs

# 2. Tipos do Node e Express
npm install --save-dev @types/node @types/express

# 3. Banco de dados (TypeORM + Oracle)
npm install typeorm @nestjs/typeorm oracledb

# 4. Validação e transformação de DTOs
npm install class-validator class-transformer

# 5. Configuração e variáveis de ambiente
npm install @nestjs/config joi

# 6. Swagger (documentação)
npm install @nestjs/swagger swagger-ui-express