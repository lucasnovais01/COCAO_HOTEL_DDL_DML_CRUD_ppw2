import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FuncionarioConverter } from '../dto/converter/funcionario.converter';
import { FuncionarioRequest } from '../dto/request/funcionario.request';
import { Repository } from 'typeorm';
import { Funcionario } from '../entity/funcionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncionarioResponse } from '../dto/response/funcionario.response';
import { Hospede } from 'src/1-hospede/entity/hospede.entity';

@Injectable()
export class FuncionarioServiceCreate {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
    @InjectRepository(Hospede)
    private hospedeRepository: Repository<Hospede>,
  ) {}

  async create(
    funcionarioRequest: FuncionarioRequest,
  ): Promise<FuncionarioResponse | null> {
    let funcionario = FuncionarioConverter.toFuncionario(funcionarioRequest);

    const funcionarioExistente = await this.funcionarioRepository
      .createQueryBuilder('f')
      .where('f.nomeLogin = :login', { login: funcionario.nomeLogin })
      .getOne();

    if (funcionarioExistente) {
      throw new HttpException(
        'Nome de login já cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hospedeExistente = await this.hospedeRepository.findOneBy({
      idUsuario: funcionario.idUsuario,
    });

    if (!hospedeExistente) {
      throw new HttpException(
        'Hóspede associado ao funcionário não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    funcionario = await this.funcionarioRepository.save(funcionario);

    await this.hospedeRepository.update(
      { idUsuario: funcionario.idUsuario },
      { tipo: 1 },
    );

    return FuncionarioConverter.toFuncionarioResponse(funcionario);
  }
}
