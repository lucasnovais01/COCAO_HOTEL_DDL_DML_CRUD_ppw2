import { Injectable } from '@nestjs/common';
import { Hospede } from '../entity/hospede.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HospedeResponse } from '../dto/response/hospede.response';
import { ConverterHospede } from '../dto/converter/hospede.converter';

@Injectable()
export class HospedeServiceFindAll {
  constructor(
    @InjectRepository(Hospede)
    private hospedeRepository: Repository<Hospede>,
  ) {}

  //async E await são comandos que sempre aparece juntos

  async findAll(): Promise<HospedeResponse[]> {
    const hospedes = await this.hospedeRepository
      .createQueryBuilder('hospede')
      .getMany();

    return ConverterHospede.toListHospedeResponse(hospedes);
  }
}

/*
 * ==============================================================
 * EXPLICAÇÃO DIDÁTICA: hospede.service.findall.ts
 * ==============================================================
 * 
 * O que é?
 *   - Service específico para a operação de FIND ALL no módulo Hospede.
 * 
 * Como funciona?
 *   1. Injeta repositório TypeORM para Hospede.
 *   2. Usa createQueryBuilder para buscar todos os registros (getMany).
 *   3. Converte a lista de entidades para lista de HospedeResponse via converter.
 *   4. Retorna a lista de responses.
 * 
 * Por quê separado?
 *   - Organização: Lógica de negócios isolada por operação.
 *   - Facilita injeção, testes e reutilização.
 * 
 * Dicas:
 *   - Pode expandir query com filtros/order se necessário.
 *   - Erros (ex.: banco offline) propagados para controller/filter.
 *   - Integra com converter para mapear entity → response.
 * 
 * ==============================================================
 */