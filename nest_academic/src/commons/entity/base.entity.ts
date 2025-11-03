import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'CREATED_AT' })
  // → Cria coluna CREATED_AT no banco
  // → Preenchida AUTOMATICAMENTE na primeira inserção

  createdAt!: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  // → Atualizada AUTOMATICAMENTE em todo UPDATE
  updatedAt!: Date;

// Construtor opcional com Partial
  // → Útil em testes ou DTOs: new Hospede({ nome: 'Lucas' })
  // → TypeORM ignora se não usado

  constructor(data: Partial<BaseEntity> = {}) {
    Object.assign(this, data);
  }
}


/**
 * ==============================================================
 * RESUMO RÁPIDO
 * ==============================================================
 * 
 * - Toda entidade HERDA de BaseEntity
 * - Garante CREATED_AT e UPDATED_AT em todas as tabelas
 * - TypeORM + Oracle cuidam da lógica automaticamente
 * 
 * ==============================================================
 */