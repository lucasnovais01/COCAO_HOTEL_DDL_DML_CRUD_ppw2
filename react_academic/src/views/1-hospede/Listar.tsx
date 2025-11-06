import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { BsPencilSquare, BsFillTrash3Fill, BsEye } from "react-icons/bs";
import type { Hospede } from "../../type/1-hospede";

import { apiGetHospedes } from "../../services/1-hospede/api/api.hospede";
import { HOSPEDE } from "../../services/1-hospede/constants/hospede.constants";
import { ROTA } from "../../services/router/url";

// Lista de hóspedes - modelo baseado em src/views/cidade/Listar.tsx
// Comentários e estrutura mantidos para didática do professor (adaptação para Hóspede)
export default function ListarHospede() {
  const [models, setModels] = useState<Hospede[] | null>(null);

  // Busca todas as entradas do backend quando o componente monta
  useEffect(() => {
    async function getAll() {
      try {
        const response = await apiGetHospedes();
        const dados = response?.data?.dados ?? null;
        if (dados) setModels(dados);
      } catch (error: any) {
        console.error("Erro ao buscar hóspedes:", error);
      }
    }

    getAll();
  }, []);

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>{HOSPEDE.TITULO.LISTA}</h2>

          {/* Link para criar novo hóspede (usa as rotas centralizadas em ROTA) */}
          <Link to={ROTA.HOSPEDE.CRIAR} className="btn btn-add">
            <span className="btn-icon">
              <i>
                <FaPlus />
              </i>
            </span>
            Novo
          </Link>
        </div>

        <br />

        <table>
          <thead>
            <tr>
              <th>{HOSPEDE.LABEL.NOME}</th>
              <th>{HOSPEDE.LABEL.CPF}</th>
              <th>{HOSPEDE.LABEL.TELEFONE}</th>
              <th className="center actions" colSpan={3}>Ação</th>
            </tr>
          </thead>

          <tbody>
            {models?.map((m) => (
              <tr key={m.idUsuario}>
                <td>{m.nomeHospede}</td>
                <td>{m.cpf}</td>
                <td>{m.telefone}</td>
                <td className="center actions">

                  {/* Link para página de atualização (Alterar) */}
                  <Link to={`${ROTA.HOSPEDE.ATUALIZAR}/${m.idUsuario}`} className="btn btn-edit">
                    <span className="btn-icon">
                      <i>
                        <BsPencilSquare />
                      </i>
                    </span>
                    Atualizar
                  </Link>

                  {/* Link para página de exclusão */}
                  <Link to={`${ROTA.HOSPEDE.EXCLUIR}/${m.idUsuario}`} className="btn btn-delete">
                    <span className="btn-icon">
                      <i>
                        <BsFillTrash3Fill />
                      </i>
                    </span>
                    Excluir
                  </Link>

                  {/* Link para página de consulta (visualizar) */}
                  <Link to={`${ROTA.HOSPEDE.POR_ID}/${m.idUsuario}`} className="btn btn-show">
                    <span className="btn-icon">
                      <i>
                        <BsEye />
                      </i>
                    </span>
                    Consulta
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}