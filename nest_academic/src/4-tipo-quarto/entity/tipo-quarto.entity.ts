import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("COCAO_TIPO_QUARTO")
export class TipoQuarto extends BaseEntity {
  @PrimaryColumn({
    name: "CODIGO_TIPO_QUARTO",
    type: "number",
  })
  codigoTipoQuarto?: number;

  @Column({
    name: "NOME_TIPO",
    type: "varchar2",
    length: 50,
    nullable: false,
  })
  nomeTipo: string = "";

  @Column({
    name: "CAPACIDADE_MAXIMA",
    type: "number",
    precision: 2,
    nullable: false,
    default: 2,
  })
  capacidadeMaxima: number = 2;

  @Column({
    name: "VALOR_DIARIA",
    type: "number",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  valorDiaria: number = 0;

  @Column({
    name: "CREATED_AT",
    type: "timestamp",
    nullable: false,
  })
  createdAt?: Date;

  @Column({
    name: "UPDATED_AT",
    type: "timestamp",
    nullable: false,
  })
  updatedAt?: Date;

  constructor(data: Partial<TipoQuarto> = {}) {
    super();
    Object.assign(this, data);
  }
}
