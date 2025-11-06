import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { HospedeServiceFindOne } from '../service/hospede.service.findone';
import { ROTA } from 'src/commons/constants/url.sistema';
import { HospedeResponse } from '../dto/response/hospede.response';
import { Result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import type { Request } from 'express';

@Controller(ROTA.HOSPEDE.BASE)
export class HospedeControllerFindOne {
  constructor(private readonly hospedeServiceFindOne: HospedeServiceFindOne) {}

  @HttpCode(HttpStatus.OK) // 200
  @Get(ROTA.HOSPEDE.BY_ID)
  async findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<HospedeResponse | null>> {
    const response = await this.hospedeServiceFindOne.findById(+id);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Hóspede localizado com sucesso!',
      response,
      ROTA.HOSPEDE.BY_ID,
      null,
    );
  }
}

// http://localhost:8000/rest/sistema/v1/hospede/buscar/:id

/*
 * ==============================================================
 * EXPLICAÇÃO DIDÁTICA: hospede.controller.findone.ts
 * ==============================================================

 * O que é?
 *   - Controller específico para a operação de FIND ONE (GET por ID) no módulo Hospede.

 * Como funciona?
 *   1. @Controller define a base da rota (ex.: /rest/sistema/v1/hospede).
 *   2. @Get adiciona o endpoint /buscar/:id, com HTTP 200 (OK).
 *   3. Injeta HospedeServiceFindOne no constructor para chamar o service.
 *   4. Método findOne recebe @Param('id') (validado como número via ParseIntPipe) e @Req() (para path).
 *   5. Chama service.findById para buscar por ID.
 *   6. Retorna response via MensagemSistema (status, mensagem, dados ou null).
 * 
 * Por quê separado?
 *   - Organização: Cada operação em arquivo próprio para clareza.
 *   - Facilita manutenção, testes e escalabilidade.
 * 
 * Dicas:
 *   - ParseIntPipe garante que :id seja número; lança erro se inválido.
 *   - Se não encontrado, service pode retornar null; filter global cuida de erros.
 *   - Integra com ROTA para URLs padronizadas.
 * 
 * ==============================================================
 */
