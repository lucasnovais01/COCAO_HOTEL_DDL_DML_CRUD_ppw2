import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

import "../../assets/css/7-form.css";
import { apiPostFuncao } from "../../services/2-funcao/api/api.funcao";
import { FUNCAO } from "../../services/2-funcao/constants/funcao.constants";
import type { Funcao } from "../../type/2-funcao";

import { ROTA } from "../../services/router/url";
import {
  createHandleChangeField,
  createShowMensagem,
  createValidateField,
} from "./zCamposCriar";

export default function CriarFuncao() {
  const navigate = useNavigate();
  const [model, setModel] = useState<Funcao>({
    codigoFuncao: "",
    nomeFuncao: "",
    descricao: "",
    nivelAcesso: 1,
  } as Funcao);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChangeField = createHandleChangeField(setModel, setErrors);
  const validateField = createValidateField(setErrors);
  const showMensagem = createShowMensagem(errors);

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!model) {
      alert("Dados incompletos para criação");
      return;
    }

    setLoading(true);

    try {
      const funcaoToSend = {
        codigoFuncao: model.codigoFuncao,
        nomeFuncao: model.nomeFuncao,
        descricao: model.descricao || null,
        nivelAcesso: Number(model.nivelAcesso),
      };

      console.log(
        "[onSubmitForm] Dados a enviar:",
        JSON.stringify(funcaoToSend, null, 2)
      );

      await apiPostFuncao(funcaoToSend as unknown as Funcao);

      navigate(ROTA.FUNCAO.LISTAR, {
        state: {
          toast: {
            message: "Função criada com sucesso!",
            type: "success",
          },
        },
      });
    } catch (error: any) {
      console.error("[onSubmitForm] Erro:", error);
      alert("Erro ao criar função");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigate(ROTA.FUNCAO.LISTAR);
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

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
            to={ROTA.FUNCAO.LISTAR}
            className="text-blue-600 hover:text-blue-700"
          >
            Funções
          </NavLink>
          <i className="fas fa-chevron-right text-gray-400"></i>
          <span className="text-gray-600">Nova Função</span>
        </div>
      </nav>

      <section className="devtools-banner">
        <div className="container text-center">
          <i className="fas fa-plus-circle text-6xl mb-4"></i>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {FUNCAO.TITULO.CRIAR}
          </h1>
          <p className="text-xl">Adicione uma nova função ao sistema</p>
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
                <label htmlFor="codigoFuncao" className="appLabel">
                  Código da Função
                </label>
                <div className="form-field-wrapper">
                  <input
                    id="codigoFuncao"
                    name="codigoFuncao"
                    type="text"
                    value={model.codigoFuncao || ""}
                    className={getInputClass()}
                    autoComplete="off"
                    onChange={(e) =>
                      handleChangeField("codigoFuncao", e.target.value)
                    }
                    onBlur={(e) => validateField("codigoFuncao", e)}
                  />
                  {showMensagem("codigoFuncao")}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={FUNCAO.FIELDS.NOME} className="appLabel">
                  {FUNCAO.LABEL.NOME}
                </label>
                <div className="form-field-wrapper">
                  <input
                    id={FUNCAO.FIELDS.NOME}
                    name={FUNCAO.FIELDS.NOME}
                    type="text"
                    value={model.nomeFuncao || ""}
                    className={getInputClass()}
                    autoComplete="off"
                    onChange={(e) =>
                      handleChangeField(FUNCAO.FIELDS.NOME, e.target.value)
                    }
                    onBlur={(e) => validateField(FUNCAO.FIELDS.NOME, e)}
                  />
                  {showMensagem(FUNCAO.FIELDS.NOME)}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={FUNCAO.FIELDS.DESCRICAO} className="appLabel">
                  {FUNCAO.LABEL.DESCRICAO}
                </label>
                <div className="form-field-wrapper">
                  <textarea
                    id={FUNCAO.FIELDS.DESCRICAO}
                    name={FUNCAO.FIELDS.DESCRICAO}
                    value={model.descricao || ""}
                    className={getInputClass()}
                    rows={4}
                    placeholder="Escreva o que esta função faz"
                    onChange={(e) =>
                      handleChangeField(FUNCAO.FIELDS.DESCRICAO, e.target.value)
                    }
                    onBlur={(e) => validateField(FUNCAO.FIELDS.DESCRICAO, e)}
                  />
                  {showMensagem(FUNCAO.FIELDS.DESCRICAO)}
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor={FUNCAO.FIELDS.NIVEL_ACESSO}
                  className="appLabel"
                >
                  {FUNCAO.LABEL.NIVEL_ACESSO}
                </label>
                <div className="form-field-wrapper">
                  <select
                    id={FUNCAO.FIELDS.NIVEL_ACESSO}
                    name={FUNCAO.FIELDS.NIVEL_ACESSO}
                    value={model.nivelAcesso || 1}
                    className={getInputClass()}
                    onChange={(e) =>
                      handleChangeField(
                        FUNCAO.FIELDS.NIVEL_ACESSO,
                        e.target.value
                      )
                    }
                    onBlur={(e) => validateField(FUNCAO.FIELDS.NIVEL_ACESSO, e)}
                  >
                    <option value={1}>1 - Básico</option>
                    <option value={2}>2 - Intermediário</option>
                    <option value={3}>3 - Avançado</option>
                  </select>
                  {showMensagem(FUNCAO.FIELDS.NIVEL_ACESSO)}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                id="submit"
                type="submit"
                className="btn btn-sucess"
                title="Criar função"
                disabled={loading}
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
                className="btn btn-cancel"
                title="Cancelar criação"
                onClick={onCancel}
                disabled={loading}
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
