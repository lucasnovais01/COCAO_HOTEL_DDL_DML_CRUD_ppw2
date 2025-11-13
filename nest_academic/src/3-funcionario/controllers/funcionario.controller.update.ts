import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
} from '@nestjs/common';
import { FuncionarioRequest } from '../dto/request/funcionario.request';
import { FuncionarioServiceUpdate } from '../service/funcionario.service.update';
import { ROTA } from 'src/commons/constants/url.sistema';
import { FuncionarioResponse } from '../dto/response/funcionario.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.FUNCIONARIO.BASE.substring(1))
export class FuncionarioControllerUpdate {
  constructor(
    private readonly funcionarioServiceUpdate: FuncionarioServiceUpdate,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.FUNCIONARIO.ENDPOINTS.UPDATE)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() funcionarioRequest: FuncionarioRequest,
  ): Promise<Result<FuncionarioResponse | null>> {
    const response = await this.funcionarioServiceUpdate.update(
      Number(id),
      funcionarioRequest,
    );
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Funcionário atualizado com sucesso',
      response,
      ROTA.FUNCIONARIO.UPDATE,
      null,
    );
  }
}
