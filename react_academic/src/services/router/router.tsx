import type { RouteObject } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";

// Importações do módulo Hóspede
import ListarHospede from "../../views/1-hospede/Listar";
import CriarHospede from "../../views/1-hospede/Criar";
import AlterarHospede from "../../views/1-hospede/Alterar";
import ExcluirHospede from "../../views/1-hospede/Excluir";
import ConsultarHospede from "../../views/1-hospede/Consultar";

import { ROTA } from "./url";

// ============================================================
// CORREÇÃO: Usar <Outlet /> no Layout (padrão do professor)
// Remover {children} do Layout.tsx
// ============================================================
export const routes: RouteObject[] = [
  {
    path: '/sistema',
    element: <Layout />, // SEM children
    children: [
      {
        path: '/sistema/dashboard',
        element: <Dashboard />,
      },
      {
        path: ROTA.HOSPEDE.LISTAR,
        element: <ListarHospede />,
      },
      {
        path: ROTA.HOSPEDE.CRIAR,
        element: <CriarHospede />,
      },
      {
        path: `${ROTA.HOSPEDE.ATUALIZAR}/:idUsuario`,
        element: <AlterarHospede />,
      },
      {
        path: `${ROTA.HOSPEDE.EXCLUIR}/:idUsuario`,
        element: <ExcluirHospede />,
      },
      {
        path: `${ROTA.HOSPEDE.POR_ID}/:idUsuario`,
        element: <ConsultarHospede />,
      },
    ],
  },
];