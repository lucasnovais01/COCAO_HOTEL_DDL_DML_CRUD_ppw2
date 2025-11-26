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
    const quartos = await this.quartoRepository
      .createQueryBuilder("quarto")
      .getMany();

    return QuartoConverter.toListQuartoResponse(quartos);
  }
}
