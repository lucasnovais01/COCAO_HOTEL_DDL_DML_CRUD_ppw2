import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Funcao } from "../../type/2-funcao";
import { apiGetFuncao, apiDeleteFuncao } from "../../services/2-funcao/api/api.funcao";
import { ROTA } from "../../services/router/url";

export default function ExcluirFuncao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Funcao | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        const res = await apiGetFuncao(Number(id));
        setModel(res?.data?.dados ?? null);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar função");
        navigate((ROTA as any).FUNCAO.LISTAR);
      }
    }
    load();
  }, [id, navigate]);

  const onDelete = async () => {
    if (!id) return alert("ID inválido");
    try {
      setLoading(true);
      const res = await apiDeleteFuncao(Number(id));
      if (res && (res.status === 204 || res.status === 200)) {
        const msg = res?.data?.mensagem ?? "Função excluída";
        navigate((ROTA as any).FUNCAO.LISTAR, { state: { toast: { message: msg, type: "success" } } });
      } else {
        const msg = res?.data?.mensagem ?? "Função excluída";
        navigate((ROTA as any).FUNCAO.LISTAR, { state: { toast: { message: msg, type: "success" } } });
      }
    } catch (err: any) {
      console.error("Erro ao excluir:", err);
      const msg = err?.response?.data?.mensagem ?? "Erro ao excluir função";
      alert(msg);
      navigate((ROTA as any).FUNCAO.LISTAR);
    } finally {
      setLoading(false);
    }
  };

  if (!model) return <div className="container py-8">Carregando...</div>;

  return (
    <div className="container py-8">
      <div className="devtools-card max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Excluir Função</h2>

        <p className="mb-4">Tem certeza que deseja excluir a função abaixo?</p>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-500">Código</label>
          <div className="mt-1 text-gray-900">{model.codigoFuncao}</div>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-500">Nome</label>
          <div className="mt-1 text-gray-900">{model.nomeFuncao}</div>
        </div>

        <div className="flex space-x-2 mt-4">
          <button className="btn-danger" onClick={onDelete} disabled={loading}>
            {loading ? "Excluindo..." : "Confirmar Exclusão"}
          </button>
          <button className="btn-secondary" onClick={() => navigate((ROTA as any).FUNCAO.LISTAR)} disabled={loading}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
