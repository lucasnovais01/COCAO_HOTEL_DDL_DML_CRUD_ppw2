import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
} from "@nestjs/common";
import type { Request } from "express";
import { ROTA } from "src/commons/constants/url.sistema";
import { Result } from "src/commons/mensagem/mensagem";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { TipoQuartoRequest } from "../dto/request/tipo-quarto.request";
import { TipoQuartoResponse } from "../dto/response/tipo-quarto.response";
import { TipoQuartoServiceUpdate } from "../service/tipo-quarto.service.update";

@Controller(ROTA.TIPO_QUARTO.BASE.substring(1))
export class TipoQuartoControllerUpdate {
  constructor(
    private readonly tipoQuartoServiceUpdate: TipoQuartoServiceUpdate
  ) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.TIPO_QUARTO.ENDPOINTS.UPDATE)
  async update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() tipoQuartoRequest: TipoQuartoRequest
  ): Promise<Result<TipoQuartoResponse | null>> {
    const response = await this.tipoQuartoServiceUpdate.update(
      Number(id),
      tipoQuartoRequest
    );
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      "Tipo de quarto atualizado com sucesso",
      response,
      ROTA.TIPO_QUARTO.UPDATE,
      null
    );
  }
}
