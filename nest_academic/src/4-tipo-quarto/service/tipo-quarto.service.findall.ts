import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TipoQuartoConverter } from "../dto/converter/tipo-quarto.converter";
import { TipoQuartoResponse } from "../dto/response/tipo-quarto.response";
import { TipoQuarto } from "../entity/tipo-quarto.entity";

@Injectable()
export class TipoQuartoServiceFindAll {
  constructor(
    @InjectRepository(TipoQuarto)
    private tipoQuartoRepository: Repository<TipoQuarto>
  ) {}

  async findAll(): Promise<TipoQuartoResponse[]> {
    const tiposQuarto = await this.tipoQuartoRepository
      .createQueryBuilder("tipoQuarto")
      .getMany();

    return TipoQuartoConverter.toListTipoQuartoResponse(tiposQuarto);
  }
}
