import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Hospede } from "../../type/1-hospede";
import { apiGetHospede } from "../../services/1-hospede/api/api.hospede";
import { HOSPEDE } from "../../services/1-hospede/constants/hospede.constants";
import { ROTA } from "../../services/router/url";

// Consultar Hóspede (visualização somente leitura)
export default function ConsultarHospede() {
  const { idUsuario } = useParams<{ idUsuario: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<Hospede | null>(null);

  useEffect(() => {
    async function getOne() {
      if (!idUsuario) return;
      try {
        const id = parseInt(idUsuario, 10);
        const response = await apiGetHospede(id);
        const dados = response?.data?.dados ?? null;
        if (dados) setModel(dados);
      } catch (error: any) {
        console.error(error);
      }
    }

    getOne();
  }, [idUsuario]);

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{HOSPEDE.TITULO.CONSULTAR}</h2>

        {model ? (
          <div>
            <p><strong>{HOSPEDE.LABEL.NOME}:</strong> {model.nomeHospede}</p>
            <p><strong>{HOSPEDE.LABEL.CPF}:</strong> {model.cpf}</p>
            <p><strong>{HOSPEDE.LABEL.RG}:</strong> {model.rg}</p>
            <p><strong>{HOSPEDE.LABEL.SEXO}:</strong> {model.sexo}</p>
            <p><strong>{HOSPEDE.LABEL.DATA_NASCIMENTO}:</strong> {model.dataNascimento ? new Date(model.dataNascimento).toLocaleDateString() : "-"}</p>
            <p><strong>{HOSPEDE.LABEL.EMAIL}:</strong> {model.email}</p>
            <p><strong>{HOSPEDE.LABEL.TELEFONE}:</strong> {model.telefone}</p>
          </div>
        ) : (
          <div>Utilize o Consultar pelo Listar</div>
        )}

        <div className="btn-content mt-4">
          <button className="btn btn-cancel" onClick={() => navigate(ROTA.HOSPEDE.LISTAR)}>Voltar</button>
        </div>
      </div>
    </div>
  );
}