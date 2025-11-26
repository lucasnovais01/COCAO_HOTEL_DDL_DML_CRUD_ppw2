import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("COCAO_QUARTO")
export class Quarto extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "ID_QUARTO",
    type: "int",
  })
  idQuarto?: number;

  @Column({
    name: "CODIGO_TIPO_QUARTO",
    type: "number",
    precision: 4,
    nullable: false,
  })
  codigoTipoQuarto: number = 0;

  @Column({
    name: "NUMERO",
    type: "number",
    nullable: false,
    unique: true,
  })
  numero: number = 0;

  @Column({
    name: "STATUS_QUARTO",
    type: "varchar2",
    length: 20,
    nullable: false,
    default: "LIVRE",
  })
  statusQuarto: string = "LIVRE";

  @Column({
    name: "ANDAR",
    type: "number",
    nullable: false,
    default: 0,
  })
  andar: number = 0;

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

  constructor(data: Partial<Quarto> = {}) {
    super();
    Object.assign(this, data);
  }
}
