import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import "../../assets/css/7-form.css";
import {
  apiGetFuncionario,
  apiPutFuncionario,
} from "../../services/3-funcionario/api/api.funcionario";
import { FUNCIONARIO } from "../../services/3-funcionario/constants/funcionario.constants";
import type { Funcionario } from "../../services/3-funcionario/type/funcionario";

import { apiGetFuncoes } from "../../services/2-funcao/api/api.funcao";
import { ROTA } from "../../services/router/url";
import type { Funcao } from "../../type/2-funcao";
import {
  createHandleChangeField,
  createShowMensagem,
  createValidateField,
} from "./zCamposAlterar";

export default function AlterarFuncionario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<Funcionario | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [funcoes, setFuncoes] = useState<Funcao[]>([]);

  const handleChangeField = createHandleChangeField(setModel, setErrors);
  const validateField = createValidateField(setErrors);
  const showMensagem = createShowMensagem(errors);

  useEffect(() => {
    async function loadData() {
      try {
        if (id) {
          const response = await apiGetFuncionario(Number(id));
          if (response.data.dados) {
            setModel(response.data.dados);
          }
        }

        const resFuncoes = await apiGetFuncoes();
        const dadosFuncoes = resFuncoes?.data?.dados ?? [];
        if (Array.isArray(dadosFuncoes)) setFuncoes(dadosFuncoes);
      } catch (error: any) {
        console.log(error);
        alert("Erro ao carregar dados");
      }
    }

    loadData();
  }, [id]);

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !model) {
      alert("Dados incompletos para atualização");
      return;
    }

    try {
      const funcionarioToSend = {
        nomeLogin: model.nomeLogin,
        senha: model.senha,
        codigoFuncao: Number(model.codigoFuncao),
        dataContratacao: model.dataContratacao,
        ativo: Number(model.ativo),
      };

      console.log(
        "[onSubmitForm] Dados a enviar:",
        JSON.stringify(funcionarioToSend, null, 2)
      );

      await apiPutFuncionario(
        Number(id),
        funcionarioToSend as unknown as Funcionario
      );

      navigate(ROTA.FUNCIONARIO.LISTAR, {
        state: {
          toast: {
            message: `Funcionário ID ${id} alterado com sucesso!`,
            type: "success",
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      alert("Erro ao atualizar funcionário");
    }
  };

  const onCancel = () => {
    navigate(ROTA.FUNCIONARIO.LISTAR);
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  if (!model) {
    return (
      <div className="padraoPagina">
        <div className="container py-8 text-center">
          <i className="fas fa-spinner fa-spin text-4xl"></i>
          <p className="mt-4">Carregando...</p>
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
          <span className="text-gray-600">Alterar</span>
        </div>
      </nav>

      <section className="devtools-banner">
        <div className="container text-center">
          <i className="fas fa-user-edit text-6xl mb-4"></i>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {FUNCIONARIO.TITULO.ATUALIZAR}
          </h1>
          <p className="text-xl">Edição de Funcionário</p>
        </div>
      </section>

      <main className="container py-8">
        <div
          className="card animated fadeInDown"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <form onSubmit={onSubmitForm}>
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
                    autoComplete="off"
                    onChange={(e) =>
                      handleChangeField(
                        FUNCIONARIO.FIELDS.NOME_LOGIN,
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      validateField(FUNCIONARIO.FIELDS.NOME_LOGIN, e)
                    }
                  />
                  {showMensagem(FUNCIONARIO.FIELDS.NOME_LOGIN)}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={FUNCIONARIO.FIELDS.SENHA} className="appLabel">
                  {FUNCIONARIO.LABEL.SENHA}
                </label>
                <div className="form-field-wrapper">
                  <input
                    id={FUNCIONARIO.FIELDS.SENHA}
                    name={FUNCIONARIO.FIELDS.SENHA}
                    type="password"
                    value={model?.senha || ""}
                    className={getInputClass()}
                    autoComplete="off"
                    onChange={(e) =>
                      handleChangeField(
                        FUNCIONARIO.FIELDS.SENHA,
                        e.target.value
                      )
                    }
                    onBlur={(e) => validateField(FUNCIONARIO.FIELDS.SENHA, e)}
                  />
                  {showMensagem(FUNCIONARIO.FIELDS.SENHA)}
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
                  <select
                    id={FUNCIONARIO.FIELDS.CODIGO_FUNCAO}
                    name={FUNCIONARIO.FIELDS.CODIGO_FUNCAO}
                    value={model?.codigoFuncao || 0}
                    className={getInputClass()}
                    onChange={(e) =>
                      handleChangeField(
                        FUNCIONARIO.FIELDS.CODIGO_FUNCAO,
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      validateField(FUNCIONARIO.FIELDS.CODIGO_FUNCAO, e)
                    }
                  >
                    <option value={0}>-- Selecione uma função --</option>
                    {funcoes.map((f) => (
                      <option key={f.codigoFuncao} value={f.codigoFuncao}>
                        {f.nomeFuncao} ({f.codigoFuncao})
                      </option>
                    ))}
                  </select>
                  {showMensagem(FUNCIONARIO.FIELDS.CODIGO_FUNCAO)}
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor={FUNCIONARIO.FIELDS.DATA_CONTRATACAO}
                  className="appLabel"
                >
                  {FUNCIONARIO.LABEL.DATA_CONTRATACAO}
                </label>
                <div className="form-field-wrapper">
                  <input
                    id={FUNCIONARIO.FIELDS.DATA_CONTRATACAO}
                    name={FUNCIONARIO.FIELDS.DATA_CONTRATACAO}
                    type="date"
                    value={
                      typeof model?.dataContratacao === "string"
                        ? model.dataContratacao
                        : ""
                    }
                    className={getInputClass()}
                    onChange={(e) =>
                      handleChangeField(
                        FUNCIONARIO.FIELDS.DATA_CONTRATACAO,
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      validateField(FUNCIONARIO.FIELDS.DATA_CONTRATACAO, e)
                    }
                  />
                  {showMensagem(FUNCIONARIO.FIELDS.DATA_CONTRATACAO)}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={FUNCIONARIO.FIELDS.ATIVO} className="appLabel">
                  {FUNCIONARIO.LABEL.ATIVO}
                </label>
                <div className="form-field-wrapper">
                  <select
                    id={FUNCIONARIO.FIELDS.ATIVO}
                    name={FUNCIONARIO.FIELDS.ATIVO}
                    value={model?.ativo || 1}
                    className={getInputClass()}
                    onChange={(e) =>
                      handleChangeField(
                        FUNCIONARIO.FIELDS.ATIVO,
                        Number(e.target.value)
                      )
                    }
                  >
                    <option value={1}>Ativo</option>
                    <option value={0}>Inativo</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                id="submit"
                type="submit"
                className="btn btn-sucess"
                title="Salvar alterações"
              >
                <span className="btn-icon">
                  <i>
                    <FaSave />
                  </i>
                </span>
                Salvar
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
          </form>
        </div>
      </main>
    </div>
  );
}
