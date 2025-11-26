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
import { QuartoRequest } from "../dto/request/quarto.request";
import { QuartoResponse } from "../dto/response/quarto.response";
import { QuartoServiceUpdate } from "../service/quarto.service.update";

@Controller(ROTA.QUARTO.BASE.substring(1))
export class QuartoControllerUpdate {
  constructor(private readonly quartoServiceUpdate: QuartoServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.QUARTO.ENDPOINTS.UPDATE)
  async update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() quartoRequest: QuartoRequest
  ): Promise<Result<QuartoResponse | null>> {
    const response = await this.quartoServiceUpdate.update(
      Number(id),
      quartoRequest
    );
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      "Quarto atualizado com sucesso",
      response,
      ROTA.QUARTO.UPDATE,
      null
    );
  }
}
