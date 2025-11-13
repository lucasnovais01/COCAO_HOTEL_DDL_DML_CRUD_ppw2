import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { FuncionarioRequest } from '../dto/request/funcionario.request';
import { FuncionarioServiceCreate } from '../service/funcionario.service.create';
import { ROTA } from 'src/commons/constants/url.sistema';
import { FuncionarioResponse } from '../dto/response/funcionario.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.FUNCIONARIO.BASE.substring(1))
export class FuncionarioControllerCreate {
  constructor(
    private readonly funcionarioServiceCreate: FuncionarioServiceCreate,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.FUNCIONARIO.ENDPOINTS.CREATE)
  async create(
    @Req() req: Request,
    @Body() funcionarioRequest: FuncionarioRequest,
  ): Promise<Result<FuncionarioResponse>> {
    const response =
      await this.funcionarioServiceCreate.create(funcionarioRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Funcionário cadastrado com sucesso!',
      response,
      ROTA.FUNCIONARIO.CREATE,
      null,
    );
  }
}
