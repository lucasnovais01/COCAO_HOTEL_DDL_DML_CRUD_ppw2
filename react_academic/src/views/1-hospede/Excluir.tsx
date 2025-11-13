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
      // await apiDeleteHospede(id); - Como estava antes do debug abaixo

      // Debug: log do ID e tentativa de delete
      console.log('[Excluir.tsx] Tentando excluir hóspede ID:', id);
      const response = await apiDeleteHospede(id);
      console.log('[Excluir.tsx] Resposta do delete:', response);

      // Observação: o backend retorna 204 No Content para deletes.
      // Axios pode trazer response.status === 204 e response.data === undefined.
      // Consideramos sucesso se não houver erro lançado.
      alert(HOSPEDE.OPERACAO.EXCLUIR.SUCESSO);
      navigate(ROTA.HOSPEDE.LISTAR);
    } catch (error: any) {
      console.error('[Excluir.tsx] Erro ao excluir:', {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
        headers: error?.response?.headers,
        config: error?.config,
      });
      // alert(HOSPEDE.OPERACAO.EXCLUIR.ERRO);
      // Exibir mensagem mais informativa para o usuário
      alert(HOSPEDE.OPERACAO.EXCLUIR.ERRO + (error?.response?.data?.mensagem ? '\n' + error.response.data.mensagem : ''));
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
            <p><strong>{HOSPEDE.LABEL.RG}:</strong> {model.rg}</p>
            <p><strong>{HOSPEDE.LABEL.SEXO}:</strong> {model.sexo}</p>
            <p><strong>{HOSPEDE.LABEL.DATA_NASCIMENTO}:</strong> {model.dataNascimento ? new Date(model.dataNascimento).toLocaleDateString() : "-"}</p>
            <p><strong>{HOSPEDE.LABEL.EMAIL}:</strong> {model.email}</p>
            <p><strong>{HOSPEDE.LABEL.TELEFONE}:</strong> {model.telefone}</p>
          </div>
        ) : (
          <div>Só funciona pelo Listar, por enquanto, clican o Listar. Ainda estou pensando em como fazer funcionar direto</div>
        )}

        <div className="btn-content mt-4">
          <button className="btn btn-delete" onClick={onDelete}>Excluir</button>
          <button className="btn btn-cancel" onClick={() => navigate(ROTA.HOSPEDE.LISTAR)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}