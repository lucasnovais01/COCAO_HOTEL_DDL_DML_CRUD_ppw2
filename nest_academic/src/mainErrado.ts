import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './commons/exceptions/filter/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    // libera o cors

    origin: ['http://localhost:3000', 'http://localhost:8000'], // endereço do react
    methods: 'GET, POST, PUT, DELETE',
    allowedheaders: 'Content-Type, Accept',
    credentials: false,
  });

  await app.listen(process.env.PORT ?? 8000); // Default to port 8000, pq no react é 3000
}

void bootstrap();

// http://localhost:8000/rest/sistema/cidade/criar

// http://localhost:8000

// http://localhost:8000/cidade/listar
// http://localhost:8000/cidade/listar/1
// http://localhost:8000/cidade/criar
// http://localhost:8000/cidade/atualizar/1
// http://localhost:8000/cidade/remover/1

/**
 * ==============================================================
 * MAIN.TS – PONTO DE ENTRADA DA APLICAÇÃO
 * ==============================================================
 
 * O que é?
 *   Arquivo que inicia o servidor NestJS.
 * 
 * Para que serve?
 *   1. Cria a aplicação com AppModule
 *   2. Registra o filtro global de erros (HttpExceptionFilter)
 *   3. Libera CORS para o React (localhost:3000)
 *   4. Inicia o servidor na porta 8000
 * 
 * Importante:
 *   - CORS: permite que o frontend acesse a API
 *   - Filtro global: padroniza TODOS os erros
 *   - Porta: 8000 (React usa 3000)
 * 
 * ==============================================================
 */
