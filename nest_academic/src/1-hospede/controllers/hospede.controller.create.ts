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

@Controller(ROTA.HOSPEDE.BASE)
export class HospedeControllerCreate {
  constructor(private readonly hospedeServiceCreate: HospedeServiceCreate) {}

  @HttpCode(HttpStatus.CREATED) // 201
  @Post(ROTA.HOSPEDE.CREATE)
  async create(
    @Req() res: Request,
    @Body() hospedeRequest: HospedeRequest,
  ): Promise<Result<HospedeResponse>> {
    const response = await this.hospedeServiceCreate.create(hospedeRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Hóspede cadastrado com sucesso!!!',
      response,
      res.path,
      null,
    );
  }
}

// http://localhost:8000/rest/sistema/v1/hospede/criar

/*
 * ==============================================================
 * EXPLICAÇÃO DIDÁTICA: hospede.controller.create.ts
 * ==============================================================
 * 
 * O que é?
 *   - Controller específico para a operação de CREATE (POST) no módulo Hospede.
 * 
 * Como funciona?
 *   1. @Controller define a base da rota (ex.: /rest/sistema/v1/hospede).
 *   2. @Post adiciona o endpoint /criar, com HTTP 201 (Created).
 *   3. Injeta HospedeServiceCreate no constructor para chamar o service.
 *   4. Método create recebe @Body() (DTO validado) e @Req() (para path).
 *   5. Chama service.create para lógica de negócios.
 *   6. Retorna resposta padronizada via MensagemSistema (status, mensagem, dados).
 * 
 * Por quê separado?
 *   - Organização: Cada operação (create, find, etc.) em arquivo próprio.
 *   - Facilita manutenção e testes unitários.
 * 
 * Dicas:
 *   - Validação do DTO ocorre automaticamente via ValidationPipe global.
 *   - Erros (ex.: validação falha) são capturados pelo HttpExceptionFilter.
 *   - Integra com ROTA para URLs consistentes.
 * 
 * ==============================================================
 */