import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from "@nestjs/common";
import type { Request } from "express";
import { ROTA } from "src/commons/constants/url.sistema";
import { Result } from "src/commons/mensagem/mensagem";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { QuartoResponse } from "../dto/response/quarto.response";
import { QuartoServiceFindOne } from "../service/quarto.service.findone";

@Controller(ROTA.QUARTO.BASE.substring(1))
export class QuartoControllerFindOne {
  constructor(private readonly quartoServiceFindOne: QuartoServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.QUARTO.ENDPOINTS.BY_ID)
  async findOne(
    @Req() req: Request,
    @Param("id") id: string
  ): Promise<Result<QuartoResponse | null>> {
    const response = await this.quartoServiceFindOne.findOne(Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      "Quarto recuperado com sucesso",
      response,
      ROTA.QUARTO.BY_ID,
      null
    );
  }
}
