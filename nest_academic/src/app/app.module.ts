import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
// Importa os 9 módulos da aplicação:
import { HospedeModule } from 'src/1-hospede/hospede.module';
import { FuncaoModule } from 'src/2-funcao/funcao.module';
import { FuncionarioModule } from 'src/3-funcionario/funcionario.module';

// Importa e executa a configuração do Oracle Client
//import './oracle-client.config';


// Foi criado o arquivo oracle-client.config.ts para isolar esta configuração específica do OracleDB:
import * as oracledb from 'oracledb';

oracledb.initOracleClient({
  libDir: 'C:\\Oracle client\\instantclient_23_9',
});


// IMPORTANTE: OS DADOS DE @Module SÃO SENSÍVEIS !!!
@Module({
  imports: [
    // 1. ConfigModule: Gerencia variáveis de ambiente (do .env)
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo disponível globalmente // Validação (Joi) para garantir que o .env está preenchido corretamente
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(), //No Oracle, isso será o 'sid'
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false), //'false' é crucial em produção
        DATABASE_LOGGING: Joi.boolean().default(true),
        DATABASE_ROW_NUMBER: Joi.boolean().default(true),
      }),
    }),
    // 2. TypeOrmModule: Configura a conexão com o banco de dados
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Depende do ConfigModule
      inject: [ConfigService], // Injeta o ConfigService para ler o .env
      // 'useFactory' constrói a configuração da conexão
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        sid: configService.get('DATABASE_DATABASE'), // 'sid' é o padrão para Oracle. // Deveria eu trocar por 'DATABASE_NAME' ?

        password: configService.get('DATABASE_PASSWORD'),
        autoLoadEntities: configService.get('DATABASE_AUTOLOADENTITIES'), // Carrega entidades automaticamente
        synchronize: configService.get('DATABASE_SYNCHRONIZE'), // Se 'true', atualiza o schema (não use em produção)
        logging: ['query', 'error'], // Níveis de log
        // entities: [Hospede], // Desnecessário se 'autoLoadEntities' for true
      }),
    }),
    // 3. Módulo da Aplicação // Importa os módulos
    HospedeModule,
    FuncaoModule,
    FuncionarioModule,
    /*
    TipoQuartoModule,
    QuartoModule,
    StatusReservaModule,
    ReservaModule,
    ServicoModule,
    HospedeServicoModule,
    */
  ],
})
export class AppModule {}

/*
 * ==============================================================
 * TUTORIAL RÁPIDO: app.module.ts (O Módulo Raiz)
 * ==============================================================
 * * O que é?
 * - Este é o módulo principal (Raiz) da sua aplicação NestJS.
 * - Ele é o ponto de partida que "amarra" todos os outros módulos (como HospedeModule),
 * configurações (ConfigModule) e conexões (TypeOrmModule).
 * * Como funciona? (Seguindo o padrão do professor)
 * 1. `oracledb.initOracleClient`: (Específico do Oracle) Inicializa o client do OracleDB,
 * apontando para a pasta onde os drivers (libDir) estão instalados na máquina.
 * 2. `ConfigModule.forRoot`: Carrega e valida variáveis de ambiente (do arquivo .env).
 * - `isGlobal: true`: Torna as variáveis de ambiente acessíveis em toda a aplicação.
 * - `validationSchema (Joi)`: Garante que o .env contenha todas as chaves obrigatórias.
 * 3. `TypeOrmModule.forRootAsync`: Conecta-se ao banco de dados DEPOIS que o `ConfigModule`
 * estiver pronto (por isso é 'Async').
 * - `useFactory`: Uma função que usa o `ConfigService` injetado para construir a
 * configuração do TypeORM com os dados do .env (usuário, senha, host, etc.).
 * - `synchronize: false`: Correto para produção. Evita que o TypeORM tente alterar
 * o banco de dados; o DDL é o responsável pelo schema.
 * 4. `HospedeModule`: (Esta foi a refatoração) Importa o módulo do Hóspede,
 * "ligando" todo o CRUD de Hóspede na aplicação principal.
 * * ==============================================================
 */
