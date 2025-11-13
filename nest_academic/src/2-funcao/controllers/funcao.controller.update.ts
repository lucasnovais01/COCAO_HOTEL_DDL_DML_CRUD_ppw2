import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
} from '@nestjs/common';
import { FuncaoRequest } from '../dto/request/funcao.request';
import { FuncaoServiceUpdate } from '../service/funcao.service.update';
import { ROTA } from 'src/commons/constants/url.sistema';
import type { Request } from 'express';
import { Result } from 'src/commons/mensagem/mensagem';
import { FuncaoResponse } from '../dto/response/funcao.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';

@Controller(ROTA.FUNCAO.BASE.substring(1))
export class FuncaoControllerUpdate {
  constructor(private readonly funcaoServiceUpdate: FuncaoServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.FUNCAO.ENDPOINTS.UPDATE)
  async update(
    @Req() res: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() funcaoRequest: FuncaoRequest,
  ): Promise<Result<FuncaoResponse>> {
    const response = await this.funcaoServiceUpdate.update(id, funcaoRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Função alterada com sucesso!',
      response,
      ROTA.FUNCAO.UPDATE,
      null,
    );
  }
}
