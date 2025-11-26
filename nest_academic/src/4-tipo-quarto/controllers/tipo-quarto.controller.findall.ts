import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import type { Request } from "express";
import { ROTA } from "src/commons/constants/url.sistema";
import { Result } from "src/commons/mensagem/mensagem";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { TipoQuartoResponse } from "../dto/response/tipo-quarto.response";
import { TipoQuartoServiceFindAll } from "../service/tipo-quarto.service.findall";

@Controller(ROTA.TIPO_QUARTO.BASE.substring(1))
export class TipoQuartoControllerFindAll {
  constructor(
    private readonly tipoQuartoServiceFindAll: TipoQuartoServiceFindAll
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.TIPO_QUARTO.ENDPOINTS.LIST)
  async findAll(@Req() req: Request): Promise<Result<TipoQuartoResponse[]>> {
    const response = await this.tipoQuartoServiceFindAll.findAll();

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      "Lista de tipos de quarto gerada com sucesso!",
      response,
      ROTA.TIPO_QUARTO.LIST,
      null
    );
  }
}
