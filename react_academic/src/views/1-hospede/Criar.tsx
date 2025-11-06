import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import type { Hospede } from "../../type/1-hospede";

import { apiPostHospede } from "../../services/1-hospede/api/api.hospede";
import { HOSPEDE } from "../../services/1-hospede/constants/hospede.constants";
import { ROTA } from "../../services/router/url";

// Criar Hóspede - formulário básico seguindo o modelo do professor (cidade)
export default function CriarHospede() {
  const navigate = useNavigate();
  // HOSPEDE.DADOS_INICIAIS traz campos como dataNascimento em string;
  // forçamos o cast para Hospede para manter compatibilidade no estado inicial.
  const [model, setModel] = useState<Hospede>(HOSPEDE.DADOS_INICIAIS as unknown as Hospede);

  // Atualiza um campo do formulário
  const handleChange = (name: keyof Hospede, value: any) => {
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  // Envia a criação para a API
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiPostHospede(model as Hospede);
      alert(HOSPEDE.OPERACAO.CRIAR.SUCESSO);
      navigate(ROTA.HOSPEDE.LISTAR);
    } catch (error: any) {
      console.error(error);
      alert(HOSPEDE.OPERACAO.CRIAR.ERRO);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{HOSPEDE.TITULO.CRIAR}</h2>

        <form onSubmit={onSubmit}>
          {/* Campo: Nome */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.NOME}</label>
            <input
              value={model.nomeHospede}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.NOME as keyof Hospede, e.target.value)}
              className="form-control"
            />
          </div>

          {/* Campo: CPF */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.CPF}</label>
            <input
              value={model.cpf}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.CPF as keyof Hospede, e.target.value)}
              className="form-control"
              maxLength={11}
            />
          </div>

          {/* Campo: Telefone */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.TELEFONE}</label>
            <input
              value={model.telefone}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.TELEFONE as keyof Hospede, e.target.value)}
              className="form-control"
            />
          </div>

          {/* Ações: Salvar / Cancelar */}
          <div className="btn-content mt-4">
            <button type="submit" className="btn btn-sucess">
              <span className="btn-icon"><FaSave /></span>
              Salvar
            </button>

            <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.HOSPEDE.LISTAR)}>
              <span className="btn-icon"><MdCancel /></span>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}