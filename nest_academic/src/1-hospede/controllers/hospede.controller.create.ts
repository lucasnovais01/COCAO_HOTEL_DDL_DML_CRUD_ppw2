import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { HospedeRequest } from '../dto/request/hospede.request';
import { HospedeServiceCreate } from '../service/hospede.service.create';
import { ROTA } from 'src/commons/constants/url.sistema';
import { HospedeResponse } from '../dto/response/hospede.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';

import type { Request } from 'express';

import { Result } from 'src/commons/mensagem/mensagem';

// =================================================================
// HISTÓRICO DE TENTATIVAS E SOLUÇÃO
// =================================================================

// TENTATIVA 1 (não funcionou):
// Problema: Rota duplicada por causa do prefixo global
// @Controller('rest/sistema/v1/hospede')
// @Post('criar')

// TENTATIVA 2 (FUNCIONOU!):
// Solução: Remover a barra inicial da rota base e usar apenas o sufixo no @Post
@Controller(ROTA.HOSPEDE.BASE.substring(1))  // Remove a barra inicial '/' da rota
export class HospedeControllerCreate {
  constructor(private readonly hospedeServiceCreate: HospedeServiceCreate) {
    /*
    // Como eu consegui achar o que causava erro 404:
    // Log para debug e documentação das rotas
    console.log('\nDEBUG ROTAS DO CONTROLLER:');
    console.log('BASE (original):', ROTA.HOSPEDE.BASE);
    console.log('BASE (sem / inicial):', ROTA.HOSPEDE.BASE.substring(1));
    console.log('CREATE:', ROTA.HOSPEDE.CREATE);
    */
  }

  // Define o código de status HTTP 201 (Created) para a resposta
  @HttpCode(HttpStatus.CREATED)
  // Usa o endpoint definido em ROTA.HOSPEDE.ENDPOINTS para evitar manipulações de string
  // Mantemos o histórico: antes usávamos .split('/').pop() para extrair o sufixo 'criar'

  // ROTA.HOSPEDE.CREATE = "/rest/sistema/v1/hospede/criar"
  // .split('/') = [ "", "rest", "sistema", "v1", "hospede", "criar" ]
  // .pop() = "criar"

  @Post(ROTA.HOSPEDE.ENDPOINTS.CREATE)
  async create(
    @Req() req: Request,
    @Body() hospedeRequest: HospedeRequest,
  ): Promise<Result<HospedeResponse>> {
    const response = await this.hospedeServiceCreate.create(hospedeRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Hóspede cadastrado com sucesso!!!',
      response,
      ROTA.HOSPEDE.CREATE, // Antes: res.path , para pegar o caminho da requisição, mas tava dando erro de tipo
      // Agora é o mesmo valor do decorator @Post(ROTA.HOSPEDE.CREATE)
      null,
    );
  }
}

// http://localhost:8000/rest/sistema/v1/hospede/criar

/*
 * ==============================================================
 * EXPLICAÇÃO DIDÁTICA: hospede.controller.create.ts
 * ==============================================================

 * O que é?
 *   - Controller específico para a operação de CREATE (POST) no módulo Hospede.

 * Como funciona?
 *   1. @Controller define a base da rota (ex.: /rest/sistema/v1/hospede).
 *   2. @Post adiciona o endpoint /criar, com HTTP 201 (Created).
 *   3. Injeta HospedeServiceCreate no constructor para chamar o service.
 *   4. Método create recebe @Body() (DTO validado) e @Req() (para path).
 *   5. Chama service.create para lógica de negócios.
 *   6. Retorna resposta padronizada via MensagemSistema (status, mensagem, dados).

 * Por quê separado?
 *   - Organização: Cada operação (create, find, etc.) em arquivo próprio.
 *   - Facilita manutenção e testes unitários.

 * Dicas:
 *   - Validação do DTO ocorre automaticamente via ValidationPipe global.
 *   - Erros (ex.: validação falha) são capturados pelo HttpExceptionFilter.
 *   - Integra com ROTA para URLs consistentes.
 * 
 * ==============================================================
 */

/*
 * ==============================================================
 * TUTORIAL: Métodos String em JavaScript/TypeScript
 * ==============================================================
 * 
 * 1. substring(1):
 * ---------------
 * - O que faz: Remove a primeira letra (ou caractere) de uma string
 * - Por que usar: Remove a barra inicial '/' das rotas
 * - Exemplo:
 *   "/rest/sistema/v1/hospede" -> "rest/sistema/v1/hospede"
 * 
 * 2. split('/'):
 * -------------
 * - O que faz: Divide uma string em array usando '/' como separador
 * - Exemplo:
 *   "/rest/sistema/v1/hospede/criar" -> ["", "rest", "sistema", "v1", "hospede", "criar"]
 * 
 * 3. pop():
 * --------
 * - O que faz: Remove e retorna o último elemento de um array
 * - Exemplo:
 *   ["", "rest", "sistema", "v1", "hospede", "criar"] -> retorna "criar"
 * 
 * 4. Combinando split('/').pop():
 * -----------------------------
 * - Pega apenas a última parte de um caminho URL
 * - Exemplo completo:
 *   ROTA.HOSPEDE.CREATE = "/rest/sistema/v1/hospede/criar"
 *   ROTA.HOSPEDE.CREATE.split('/') -> ["", "rest", "sistema", "v1", "hospede", "criar"]
 *   ROTA.HOSPEDE.CREATE.split('/').pop() -> "criar"
 * 
 * ==============================================================
 */

/* 
 * ==============================================================
 * SOLUÇÃO DO PROBLEMA DE ROTAS 404
 * ==============================================================
 * 
 * O PROBLEMA:
 * ----------
 * 1. As rotas não estavam funcionando (erro 404) porque havia uma
 *    incompatibilidade na forma como o NestJS trata as barras iniciais
 *    nas rotas.
 * 
 * 2. No arquivo url.sistema.ts, as rotas são geradas com barra inicial:
 *    ROTA.HOSPEDE.BASE = "/rest/sistema/v1/hospede"
 *    ROTA.HOSPEDE.CREATE = "/rest/sistema/v1/hospede/criar"
 * 
 * 3. O NestJS espera:
 *    - @Controller: rota base SEM barra inicial
 *    - @Post: apenas o sufixo da rota
 * 
 * A SOLUÇÃO:
 * ---------
 * 1. No @Controller:
 *    - Usar ROTA.HOSPEDE.BASE.substring(1) para remover a barra inicial
 *    - Resultado: "rest/sistema/v1/hospede"
 * 
 * 2. No @Post:
 *    - Usar ROTA.HOSPEDE.CREATE.split('/').pop() para pegar só o 'criar'
 *    - Isso evita duplicação do caminho base
 * 
 * EXEMPLO DE COMO FICA:
 * -------------------
 * Base original: "/rest/sistema/v1/hospede"
 * Base processada: "rest/sistema/v1/hospede"
 * Rota POST: "criar"
 * URL final: "http://localhost:8000/rest/sistema/v1/hospede/criar"
 * 
 * LOGS DO SERVIDOR:
 * ---------------
 * [RouterExplorer] Mapped {/rest/sistema/v1/hospede/criar, POST} route
 * 
 * IMPORTANTE:
 * ----------
 * 1. Esta solução mantém a estrutura de ROTA do professor
 * 2. Não precisamos mudar a lógica de geração de rotas
 * 3. Apenas adaptamos como o controller usa essas rotas
 * 4. Os logs mostram que a rota está corretamente registrada
 * 
 * ==============================================================
 */