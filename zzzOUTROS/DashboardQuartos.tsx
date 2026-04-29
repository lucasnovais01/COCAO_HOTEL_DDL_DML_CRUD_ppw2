// src/views/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import '../../assets/css/style.css';
import '../../assets/css/layout.css';

// === MOCK DATA (substituir por API depois) ===
const quartosData = [
  {
    id: 'Q001',
    numero: '201',
    andar: '2º',
    tipo: 'Standard',
    nome_tipo: 'Quarto Standard',
    capacidade_maxima: 2,
    valor_diaria: 250.00,
    status_quarto: 'OCUPADO',
    datasOcupadas: ['2025-11-15', '2025-11-16', '2025-11-22'],
  },
  {
    id: 'Q002',
    numero: '301',
    andar: '3º',
    tipo: 'Luxo',
    nome_tipo: 'Quarto Luxo',
    capacidade_maxima: 3,
    valor_diaria: 450.00,
    status_quarto: 'LIVRE',
    datasOcupadas: ['2025-11-10', '2025-11-11'],
  },
  {
    id: 'Q003',
    numero: '401',
    andar: '4º',
    tipo: 'Suíte',
    nome_tipo: 'Suíte Premium',
    capacidade_maxima: 4,
    valor_diaria: 650.00,
    status_quarto: 'LIVRE',
    datasOcupadas: ['2025-11-05', '2025-11-06'],
  },
];

const servicosData = [
  { nome: 'Café da Manhã', preco: 25.00, icon: 'fa-coffee' },
  { nome: 'Almoço', preco: 45.00, icon: 'fa-utensils' },
  { nome: 'Jantar', preco: 55.00, icon: 'fa-moon' },
  { nome: 'Lavanderia', preco: 10.00, icon: 'fa-tshirt', unidade: '/peça' },
];

const Dashboard: React.FC = () => {
  const [secaoAtiva, setSecaoAtiva] = useState<'quartos' | 'servicos'>('quartos');
  const [calendarioAberto, setCalendarioAberto] = useState<string | null>(null);
  const [mesAtual, setMesAtual] = useState(new Date());

  // === FUNÇÕES DO CALENDÁRIO ===
  const gerarCalendario = (quartoId: string) => {
    const quarto = quartosData.find(q => q.id === quartoId);
    if (!quarto) return null;

    const inicio = startOfMonth(mesAtual);
    const fim = endOfMonth(mesAtual);
    const dias = eachDayOfInterval({ start: inicio, end: fim });

    const primeiroDiaSemana = inicio.getDay();
    const diasVazios = Array.from({ length: primeiroDiaSemana }, (_, i) => i);

    return (
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Agendamentos - {quarto.nome_tipo} {quarto.numero}
          </h2>
          <button
            onClick={() => setCalendarioAberto(null)}
            className="text-gray-500 hover:text-red-600 transition-colors duration-300"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setMesAtual(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3 className="text-2xl font-semibold text-gray-700">
            {format(mesAtual, 'MMMM yyyy', { locale: require('date-fns/locale/pt-BR') })}
          </h3>
          <button
            onClick={() => setMesAtual(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="calendario-table w-full">
            <thead>
              <tr>
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
                  <th key={dia}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil((dias.length + primeiroDiaSemana) / 7) }, (_, semana) => (
                <tr key={semana}>
                  {Array.from({ length: 7 }, (_, diaSemana) => {
                    const indice = semana * 7 + diaSemana - primeiroDiaSemana;
                    const dia = dias[indice];

                    if (!dia) {
                      return <td key={diaSemana} className="dia-vazio"></td>;
                    }

                    const dataStr = format(dia, 'yyyy-MM-dd');
                    const ocupado = quarto.datasOcupadas.includes(dataStr);
                    const hoje = isSameDay(dia, new Date());

                    return (
                      <td
                        key={diaSemana}
                        className={`
                          ${ocupado ? 'dia-ocupado' : ''}
                          ${hoje ? 'dia-atual' : ''}
                        `}
                      >
                        {format(dia, 'd')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // === CARD DE QUARTO ===
  const QuartoCard = ({ quarto }: { quarto: typeof quartosData[0] }) => {
    const statusConfig = {
      LIVRE: { class: 'status-disponivel', icon: 'fa-check', text: 'DISPONÍVEL', bg: 'from-green-300 to-green-500', iconColor: 'text-green-600' },
      OCUPADO: { class: 'status-ocupado', icon: 'fa-times', text: 'OCUPADO', bg: 'from-red-300 to-red-500', iconColor: 'text-red-600' },
      MANUTENCAO: { class: 'status-manutencao', icon: 'fa-tools', text: 'MANUTENÇÃO', bg: 'from-yellow-300 to-yellow-500', iconColor: 'text-yellow-600' },
    };

    const config = statusConfig[quarto.status_quarto] || statusConfig.LIVRE;

    return (
      <div className={`room-card bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${quarto.status_quarto === 'LIVRE' ? 'border-green-500' : quarto.status_quarto === 'OCUPADO' ? 'border-red-500' : 'border-yellow-500'} relative`}>
        <div className="absolute top-3 right-3 z-10">
          <span className={`status-badge ${config.class}`}>
            <i className={`fas ${config.icon}`}></i>
            {config.text}
          </span>
        </div>

        <div className={`h-48 bg-gradient-to-br ${config.bg} flex items-center justify-center`}>
          <i className={`fas fa-bed text-6xl ${config.iconColor}`}></i>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{quarto.nome_tipo}</h3>
          <div className="space-y-2 mb-4">
            <p className="text-gray-600">
              <i className="fas fa-door-open mr-2 text-blue-600"></i>
              Quarto {quarto.numero} - {quarto.andar} andar
            </p>
            <p className="text-gray-600">
              <i className="fas fa-users mr-2 text-blue-600"></i>
              Até {quarto.capacidade_maxima} hóspedes
            </p>
            <p className="text-2xl font-bold text-blue-700">
              R$ {quarto.valor_diaria.toFixed(2)}/diária
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                quarto.status_quarto === 'LIVRE'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
              disabled={quarto.status_quarto !== 'LIVRE'}
            >
              <i className="fas fa-eye mr-2"></i>
              Ver Detalhes
            </button>
            <button
              onClick={() => setCalendarioAberto(quarto.id)}
              className="btn-agendamentos bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-blue-100 transition-all duration-300"
            >
              <i className="fas fa-clock"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Espaço para header fixo */}
      <div className="h-20"></div>

      {/* BANNER PRINCIPAL */}
      <section className="banner-principal relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Bem-vindo ao Hotel Cocao
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-delay">
            Conforto e simplicidade para sua estadia
          </p>
          <button className="cta-button inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Reserve Agora
          </button>
        </div>
      </section>

      {/* MENU SECUNDÁRIO */}
      <section className="bg-gray-100 shadow-inner py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <button
              className={`section-toggle-btn ${secaoAtiva === 'quartos' ? 'active' : ''} flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300`}
              onClick={() => setSecaoAtiva('quartos')}
            >
              <i className="fas fa-bed text-2xl"></i>
              <span className="text-lg font-semibold">QUARTOS</span>
            </button>
            <button
              className={`section-toggle-btn ${secaoAtiva === 'servicos' ? 'active' : ''} flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300`}
              onClick={() => setSecaoAtiva('servicos')}
            >
              <i className="fas fa-concierge-bell text-2xl"></i>
              <span className="text-lg font-semibold">SERVIÇOS</span>
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO QUARTOS */}
      <section
        id="section-quartos"
        className={`container mx-auto px-4 py-12 ${secaoAtiva === 'servicos' ? 'hidden' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="quartos-grid">
          {quartosData.map(quarto => (
            <QuartoCard key={quarto.id} quarto={quarto} />
          ))}
        </div>
      </section>

      {/* SEÇÃO SERVIÇOS */}
      <section
        id="section-servicos"
        className={`container mx-auto px-4 py-12 ${secaoAtiva === 'quartos' ? 'hidden' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicosData.map((servico, i) => (
            <div key={i} className="service-card bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-center mb-4">
                <i className={`fas ${servico.icon} text-5xl text-blue-600`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{servico.nome}</h3>
              <p className="text-gray-600 text-center mb-4">
                {servico.nome === 'Lavanderia' ? 'Serviço de lavanderia rápida e cuidadosa' : `Refeição completa com pratos variados`}
              </p>
              <p className="text-2xl font-bold text-blue-700 text-center">
                R$ {servico.preco.toFixed(2)}{servico.unidade || ''}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CALENDÁRIO MODAL */}
      {calendarioAberto && (
        <section
          id="section-calendario"
          className="container mx-auto px-4 py-12 fade-in"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {gerarCalendario(calendarioAberto)}
        </section>
      )}
    </>
  );
};

export default Dashboard;