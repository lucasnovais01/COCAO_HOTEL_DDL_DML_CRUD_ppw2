import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Hospede } from "../../type/1-hospede";
import { apiGetHospede, apiDeleteHospede } from "../../services/1-hospede/api/api.hospede";
import { HOSPEDE } from "../../services/1-hospede/constants/hospede.constants";
import { ROTA } from "../../services/router/url";

// Excluir Hóspede - confirmação e chamada de delete
export default function ExcluirHospede() {
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

  const onDelete = async () => {
    if (!idUsuario) return;
    if (!confirm(`Confirma exclusão do hóspede ID: ${idUsuario}?`)) return;
    try {
      const id = parseInt(idUsuario, 10);
      await apiDeleteHospede(id);
      alert(HOSPEDE.OPERACAO.EXCLUIR.SUCESSO);
      navigate(ROTA.HOSPEDE.LISTAR);
    } catch (error: any) {
      console.error(error);
      alert(HOSPEDE.OPERACAO.EXCLUIR.ERRO);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{HOSPEDE.TITULO.EXCLUIR}</h2>

        {model ? (
          <div>
            <p>Tem certeza que deseja excluir o hóspede abaixo?</p>
            <p><strong>{HOSPEDE.LABEL.NOME}:</strong> {model.nomeHospede}</p>
            <p><strong>{HOSPEDE.LABEL.CPF}:</strong> {model.cpf}</p>
          </div>
        ) : (
          <div>Carregando...</div>
        )}

        <div className="btn-content mt-4">
          <button className="btn btn-delete" onClick={onDelete}>Excluir</button>
          <button className="btn btn-cancel" onClick={() => navigate(ROTA.HOSPEDE.LISTAR)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}