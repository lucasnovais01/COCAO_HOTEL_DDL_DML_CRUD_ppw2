import type { RouteObject } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import DevTools from "../../views/DevTools";
// Observação: vamos usar um redirect da raiz para o DevTools para que
// acessar '/' não gere erro de rota inexistente.
import { Navigate } from "react-router-dom";

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
  // Redirecionamento da raiz '/' para o Dashboard
  // Motivo (pt-BR): abrir http://localhost:5173/ (ou :5174) deve levar ao
  // Dashboard do sistema; sem esse redirect a aplicação retorna "No route matches URL '/'".
  {
    path: '/',
    element: <Navigate to="/sistema/dashboard" replace />,
  },

  {
    path: '/sistema',
    element: <Layout />, // SEM children
    children: [
      {
        path: '/sistema/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/sistema/devtools',
        element: <DevTools />,
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