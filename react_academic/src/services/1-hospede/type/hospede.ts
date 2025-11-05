export interface Hospede {
  idUsuario?: number;
  nomeHospede?: string;
  cpf?: string;
  rg?: string;
  sexo?: string;
  dataNascimento?: Date;
  email?: string;
  telefone?: string;
  tipo?: number;
  ativo?: number;
  createdAt?: Date;
  updatedAt?: Date;
}