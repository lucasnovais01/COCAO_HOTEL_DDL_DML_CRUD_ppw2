import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { FuncionarioServiceRemove } from '../service/funcionario.service.remove';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.FUNCIONARIO.BASE.substring(1))
export class FuncionarioControllerRemove {
  constructor(
    private readonly funcionarioServiceRemove: FuncionarioServiceRemove,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(ROTA.FUNCIONARIO.ENDPOINTS.DELETE)
  async remove(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<null>> {
    await this.funcionarioServiceRemove.remove(Number(id));

    return MensagemSistema.showMensagem(
      HttpStatus.NO_CONTENT,
      'Funcionário removido com sucesso',
      null,
      ROTA.FUNCIONARIO.DELETE,
      null,
    );
  }
}
