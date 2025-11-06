import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './commons/exceptions/filter/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de filtros globais
  app.useGlobalFilters(new HttpExceptionFilter());

  // Habilitar CORS para permitir que o frontend (React) se conecte
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8000'], // endereço do react
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: false,
  });

  // ERRADO: O código original não estava configurando o prefixo global da API, o que causava o erro 404.
  // O NestJS não sabia como mapear corretamente as rotas sem esse prefixo global.
  //
  // CORRIGIDO: Adicionamos a configuração `app.setGlobalPrefix('rest/sistema/v1')` 
  // para que todas as rotas da API sejam prefixadas corretamente.
  app.setGlobalPrefix('rest/sistema/v1'); // Configura o prefixo global para todas as rotas (ex.: /rest/sistema/v1/hospede)

  // Inicia o servidor na porta 8000
  await app.listen(process.env.PORT ?? 8000);
}

void bootstrap();

/*
 * ============================================================== 
 * MAIN.TS – PONTO DE ENTRADA DA APLICAÇÃO
 * ============================================================== 
 * 
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
 *   - **Novo**: Prefixo global adicionado para rotas da API, agora `/rest/sistema/v1/`
 * 
 * ============================================================== 
 */
