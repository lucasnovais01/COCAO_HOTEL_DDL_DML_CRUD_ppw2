import { useEffect, useState } from "react";
import { MdCancel, MdDelete } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import "../../assets/css/7-form.css";
import { apiGetFuncionario } from "../../services/3-funcionario/api/api.funcionario";
import { FUNCIONARIO } from "../../services/3-funcionario/constants/funcionario.constants";
import type { Funcionario } from "../../services/3-funcionario/type/funcionario";
import { ROTA } from "../../services/router/url";

export default function ExcluirFuncionario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  useEffect(() => {
    async function getFuncionario() {
      try {
        if (id) {
          const response = await apiGetFuncionario(Number(id));
          if (response.data.dados) {
            setModel(response.data.dados);
          }
        }
      } catch (err: any) {
        console.error(err);
        setError("Erro ao carregar funcionário");
      } finally {
        setLoading(false);
      }
    }

    getFuncionario();
  }, [id]);

  const onDelete = async () => {
    if (!id || !model) {
      alert("Dados incompletos");
      return;
    }

    if (
      !confirm(
        `Tem certeza que deseja remover a função do funcionário ID: ${id}?\nEle será transformado em hóspede.`
      )
    ) {
      return;
    }

    setDeleting(true);

    try {
      // Em vez de deletar, apenas remove a função (set codigoFuncao = null)
      const funcionarioToSend = {
        nomeLogin: model.nomeLogin,
        senha: model.senha,
        codigoFuncao: null,
        dataContratacao: model.dataContratacao,
        ativo: Number(model.ativo),
      };

      console.log(
        "[onDelete] Removendo função - Dados a enviar:",
        JSON.stringify(funcionarioToSend, null, 2)
      );

      // Usa PUT para atualizar (removendo a função) em vez de DELETE
      const { apiPutFuncionario } = await import(
        "../../services/3-funcionario/api/api.funcionario"
      );
      await apiPutFuncionario(
        Number(id),
        funcionarioToSend as unknown as Funcionario
      );

      navigate(ROTA.FUNCIONARIO.LISTAR, {
        state: {
          toast: {
            message: `Funcionário ID ${id} transformado em hóspede com sucesso!`,
            type: "success",
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      alert("Erro ao remover função do funcionário");
    } finally {
      setDeleting(false);
    }
  };

  const onCancel = () => {
    navigate(ROTA.FUNCIONARIO.LISTAR);
  };

  if (loading) {
    return (
      <div className="padraoPagina">
        <div className="container py-8 text-center">
          <i className="fas fa-spinner fa-spin text-4xl"></i>
          <p className="mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="padraoPagina">
        <div className="container py-8">
          <div className="card bg-red-50 border-l-4 border-red-600 p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-2">Erro</h2>
            <p className="text-red-700">
              {error || "Funcionário não encontrado"}
            </p>
            <NavLink
              to={ROTA.FUNCIONARIO.LISTAR}
              className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
            >
              ← Voltar para lista
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="padraoPagina">
      <nav className="breadcrumb">
        <div className="container flex items-center space-x-2 text-sm">
          <NavLink
            to="/sistema/dashboard"
            className="text-blue-600 hover:text-blue-700"
          >
            Home
          </NavLink>
          <i className="fas fa-chevron-right text-gray-400"></i>
          <NavLink
            to={ROTA.FUNCIONARIO.LISTAR}
            className="text-blue-600 hover:text-blue-700"
          >
            Funcionários
          </NavLink>
          <i className="fas fa-chevron-right text-gray-400"></i>
          <span className="text-gray-600">Excluir</span>
        </div>
      </nav>

      <section className="devtools-banner bg-red-600 text-white">
        <div className="container text-center">
          <i className="fas fa-trash-alt text-6xl mb-4"></i>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {FUNCIONARIO.TITULO.EXCLUIR}
          </h1>
          <p className="text-xl">Exclusão permanente de funcionário</p>
        </div>
      </section>

      <main className="container py-8">
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded">
          <h3 className="text-lg font-semibold text-red-600 mb-2">⚠️ Aviso</h3>
          <p className="text-red-700">
            Esta ação é permanente e não pode ser desfeita. O funcionário será
            removido do sistema.
          </p>
        </div>

        <div
          className="card animated fadeInDown"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor={FUNCIONARIO.FIELDS.ID} className="appLabel">
                ID do Usuário
              </label>
              <div className="form-field-wrapper">
                <input
                  id={FUNCIONARIO.FIELDS.ID}
                  name={FUNCIONARIO.FIELDS.ID}
                  type="number"
                  value={model?.idUsuario || ""}
                  className={getInputClass()}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor={FUNCIONARIO.FIELDS.NOME_LOGIN}
                className="appLabel"
              >
                {FUNCIONARIO.LABEL.NOME_LOGIN}
              </label>
              <div className="form-field-wrapper">
                <input
                  id={FUNCIONARIO.FIELDS.NOME_LOGIN}
                  name={FUNCIONARIO.FIELDS.NOME_LOGIN}
                  type="text"
                  value={model?.nomeLogin || ""}
                  className={getInputClass()}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor={FUNCIONARIO.FIELDS.CODIGO_FUNCAO}
                className="appLabel"
              >
                {FUNCIONARIO.LABEL.CODIGO_FUNCAO}
              </label>
              <div className="form-field-wrapper">
                <input
                  id={FUNCIONARIO.FIELDS.CODIGO_FUNCAO}
                  name={FUNCIONARIO.FIELDS.CODIGO_FUNCAO}
                  type="number"
                  value={model?.codigoFuncao || ""}
                  className={getInputClass()}
                  readOnly
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              id="delete"
              type="button"
              disabled={deleting}
              onClick={onDelete}
              className="btn btn-delete"
              title="Excluir funcionário"
            >
              <span className="btn-icon">
                <i>
                  <MdDelete />
                </i>
              </span>
              Excluir
            </button>

            <button
              id="cancel"
              type="button"
              onClick={onCancel}
              className="btn btn-cancel"
              title="Cancelar"
            >
              <span className="btn-icon">
                <i>
                  <MdCancel />
                </i>
              </span>
              Cancelar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
