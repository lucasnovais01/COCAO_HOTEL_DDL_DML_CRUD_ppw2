import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Funcao } from "../../type/2-funcao";
import { apiGetFuncao } from "../../services/2-funcao/api/api.funcao";
import { ROTA } from "../../services/router/url";

export default function ConsultarFuncao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Funcao | null>(null);

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        const res = await apiGetFuncao(Number(id));
        const dados = res?.data?.dados ?? null;
        setModel(dados);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!model) return <div className="container py-8">Carregando...</div>;

  return (
    <div className="container py-8">
      <div className="devtools-card max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Consultar Função</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-500">Código</label>
          <div className="mt-1 text-gray-900">{model.codigoFuncao}</div>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-500">Nome</label>
          <div className="mt-1 text-gray-900">{model.nomeFuncao}</div>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-500">Descrição</label>
          <div className="mt-1 text-gray-900">{model.descricao ?? "-"}</div>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-500">Nível de Acesso</label>
          <div className="mt-1 text-gray-900">{model.nivelAcesso}</div>
        </div>

        <div className="flex space-x-2 mt-4">
          <button className="btn-secondary" onClick={() => navigate((ROTA as any).FUNCAO.LISTAR)}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
