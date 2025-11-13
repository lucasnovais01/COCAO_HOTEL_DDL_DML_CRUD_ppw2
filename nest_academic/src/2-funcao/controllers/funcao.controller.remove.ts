import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { FuncaoServiceRemove } from '../service/funcao.service.remove';
import { ROTA } from 'src/commons/constants/url.sistema';

import { Result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import type { Request } from 'express';

@Controller(ROTA.FUNCAO.BASE.substring(1))
export class FuncaoControllerRemove {
  constructor(private readonly funcaoServiceRemove: FuncaoServiceRemove) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(ROTA.FUNCAO.ENDPOINTS.DELETE)
  async remove(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<void>> {
    await this.funcaoServiceRemove.remove(id);

    const rawPath =
      (req as any).path ?? (req as any).url ?? (req as any).originalUrl;
    const path: string | null = typeof rawPath === 'string' ? rawPath : null;

    return MensagemSistema.showMensagem(
      HttpStatus.NO_CONTENT,
      'Função excluída com sucesso!',
      null,
      path,
      null,
    );
  }
}
