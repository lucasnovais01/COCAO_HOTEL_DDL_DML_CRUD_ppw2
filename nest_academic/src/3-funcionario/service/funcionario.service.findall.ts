import { Injectable } from '@nestjs/common';
import { Funcionario } from '../entity/funcionario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncionarioResponse } from '../dto/response/funcionario.response';
import { FuncionarioConverter } from '../dto/converter/funcionario.converter';

@Injectable()
export class FuncionarioServiceFindAll {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}

  async findAll(): Promise<FuncionarioResponse[]> {
    const funcionarios = await this.funcionarioRepository
      .createQueryBuilder('funcionario')
      .getMany();

    /*
    // Este console.log que me ajudou a achar um bug esquisito

    console.log(
      '[FuncionarioServiceFindAll] registros encontrados:',
      funcionarios?.length ?? 0,
    );
    console.log(
      '[FuncionarioServiceFindAll] amostra:',
      funcionarios?.slice(0, 5),
    );
*/
    return FuncionarioConverter.toListFuncionarioResponse(funcionarios);
  }
}
