import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { HospedeServiceFindAll } from '../service/hospede.service.findall';
import { ROTA } from 'src/commons/constants/url.sistema';
import { HospedeResponse } from '../dto/response/hospede.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.HOSPEDE.BASE.substring(1)) // Remove a barra inicial para evitar duplicação
export class HospedeControllerFindAll {
  constructor(private readonly hospedeServiceFindAll: HospedeServiceFindAll) {}

  @HttpCode(HttpStatus.OK) // 200
  // Usa o endpoint definido em ROTA.HOSPEDE.ENDPOINTS para manter clareza
  // Histórico: antes usávamos .split('/').pop() para extrair 'listar'
  @Get(ROTA.HOSPEDE.ENDPOINTS.LIST)
  async findAll(@Req() res: Request): Promise<Result<HospedeResponse[]>> {
    const response = await this.hospedeServiceFindAll.findAll();

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de hóspedes gerada com sucesso!',
      response,
      ROTA.HOSPEDE.LIST,
      null,
    );
  }
}

/*
Problemas que eu estou tendo na linha 17:
    async findAll(@Req() res: Request): Promise<Result<HospedeResponse[]>> {

O nome do erro é:
  'res' is declared but its value is never read.ts(6133)
*/

//

// http://localhost:8000/rest/sistema/v1/hospede/listar

/*
 * ==============================================================
 * EXPLICAÇÃO DIDÁTICA: hospede.controller.findall.ts
 * ==============================================================

 * O que é?
 *   - Controller específico para a operação de FIND ALL (GET) no módulo Hospede.

 * Como funciona?
 *   1. @Controller define a base da rota (ex.: /rest/sistema/v1/hospede).
 *   2. @Get adiciona o endpoint /listar, com HTTP 200 (OK).
 *   3. Injeta HospedeServiceFindAll no constructor para chamar o service.
 *   4. Método findAll recebe @Req() (para path) e chama service.findAll.
 *   5. Retorna lista de responses via MensagemSistema (status, mensagem, dados).

 * Por quê separado?
 *   - Organização: Cada operação em arquivo próprio para clareza.
 *   - Facilita manutenção, testes e escalabilidade.

 * Dicas:
 *   - Não precisa de @Body() pois é GET sem parâmetros.
 *   - Erros são capturados pelo HttpExceptionFilter global.
 *   - Integra com ROTA para URLs padronizadas.
 *
 * ==============================================================
 */
