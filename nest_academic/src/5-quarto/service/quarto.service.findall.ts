import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuartoConverter } from "../dto/converter/quarto.converter";
import { QuartoResponse } from "../dto/response/quarto.response";
import { Quarto } from "../entity/quarto.entity";

@Injectable()
export class QuartoServiceFindAll {
  constructor(
    @InjectRepository(Quarto)
    private quartoRepository: Repository<Quarto>
  ) {}

  async findAll(): Promise<QuartoResponse[]> {
    console.log("[QuartoServiceFindAll] Iniciando busca de todos os quartos");

    const quartos = await this.quartoRepository
      .createQueryBuilder("quarto")
      .getMany();

    console.log("[QuartoServiceFindAll] Quartos encontrados:", quartos.length);
    console.log(
      "[QuartoServiceFindAll] Dados brutos:",
      JSON.stringify(quartos, null, 2)
    );

    const response = QuartoConverter.toListQuartoResponse(quartos);

    console.log(
      "[QuartoServiceFindAll] Resposta convertida:",
      JSON.stringify(response, null, 2)
    );

    return response;
  }
}
