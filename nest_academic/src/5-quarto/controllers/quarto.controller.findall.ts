import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import type { Request } from "express";
import { ROTA } from "src/commons/constants/url.sistema";
import { Result } from "src/commons/mensagem/mensagem";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { QuartoResponse } from "../dto/response/quarto.response";
import { QuartoServiceFindAll } from "../service/quarto.service.findall";

@Controller(ROTA.QUARTO.BASE.substring(1))
export class QuartoControllerFindAll {
  constructor(private readonly quartoServiceFindAll: QuartoServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.QUARTO.ENDPOINTS.LIST)
  async findAll(@Req() req: Request): Promise<Result<QuartoResponse[]>> {
    console.log("[QuartoControllerFindAll] GET request recebido");
    console.log(
      "[QuartoControllerFindAll] Endpoint:",
      ROTA.QUARTO.ENDPOINTS.LIST
    );
    console.log("[QuartoControllerFindAll] Base:", ROTA.QUARTO.BASE);

    const response = await this.quartoServiceFindAll.findAll();

    console.log(
      "[QuartoControllerFindAll] Response do service:",
      JSON.stringify(response, null, 2)
    );

    const resultado = MensagemSistema.showMensagem(
      HttpStatus.OK,
      "Lista de quartos gerada com sucesso!",
      response,
      ROTA.QUARTO.LIST,
      null
    );

    console.log(
      "[QuartoControllerFindAll] Mensagem final:",
      JSON.stringify(resultado, null, 2)
    );

    return resultado;
  }
}
