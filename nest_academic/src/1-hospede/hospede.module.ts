// src/1-hospede/hospede.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospede } from './entity/hospede.entity';
import { HospedeController } from './controller/hospede.controller';
import { HospedeServiceCreate } from './service/hospede.service.create';
// Importe aqui os outros services (FindOne, Update, Delete) à medida que os criarmos.

/**
 * Módulo principal para a entidade COCAO_HOSPEDE.
 * * Responsabilidades:
 * 1. Importar TypeOrmModule.forFeature, registrando a entidade Hospede.
 * 2. Declarar o Controller (HospedeController) para expor as rotas HTTP.
 * 3. Declarar os Services (Provedores) para encapsular a lógica de negócios e injeção do repositório.
 */
@Module({
  imports: [
    // 1. Registra a entidade Hospede para que o TypeORM possa injetar o repositório
    TypeOrmModule.forFeature([Hospede]),
  ],
  controllers: [
    // 2. Registra o Controller para que o NestJS mapeie as rotas
    HospedeController,
  ],
  providers: [
    // 3. Registra os Services/Provedores de lógica de negócios
    HospedeServiceCreate,
    // [ADICIONAR OUTROS SERVICES AQUI]
  ],
  // Opcional: Se outros módulos precisarem usar HospedeServiceCreate, adicione-o em 'exports'
  exports: [
    TypeOrmModule.forFeature([Hospede]), 
    HospedeServiceCreate // Exporta o service para uso em outros módulos (se necessário)
  ]
})
export class HospedeModule {}

/*
 * ==============================================================
 * TUTORIAL RÁPIDO: hospede.module.ts
 * ==============================================================
 * * O que é?
 * - Contêiner de dependências para o recurso Hóspede.
 * * Para que serve?
 * - Organiza o código: Agrupa controller, services e repositório.
 * - Permite Injeção: O TypeOrmModule.forFeature([Hospede]) permite que você use 
 * @InjectRepository(Hospede) no seu service.
 * - Ponto de entrada: Precisa ser importado no AppModule (Módulo principal) para funcionar.
 * * Dicas:
 * - Use 'controllers' para classes que lidam com HTTP.
 * - Use 'providers' para classes que lidam com lógica de negócios (Services).
 * * ==============================================================
 */