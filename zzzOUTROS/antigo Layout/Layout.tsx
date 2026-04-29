// src/components/layout/Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/style.css';
import '../../assets/css/layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mapear rota para página ativa
  useEffect(() => {
    const path = location.pathname;
    const pageMap: { [key: string]: string } = {
      '/': 'home',
      '/funcionarios': 'funcionarios',
      '/sobre': 'sobre',
      '/faq': 'faq',
      '/devtools': 'devtools',
      '/login': 'login',
    };
    setActivePage(pageMap[path] || 'home');
  }, [location]);

  // Detectar scroll para sombra no header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    setActivePage(page);
    const routeMap: { [key: string]: string } = {
      home: '/',
      funcionarios: '/funcionarios',
      sobre: '/sobre',
      faq: '/faq',
      devtools: '/devtools',
      login: '/login',
    };
    navigate(routeMap[page]);
  };

  return (
    <>
      {/* HEADER FIXO */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <i className="fas fa-hotel"></i>
            <span id="hotel-name">Hotel Cocao</span>
          </div>

          {/* Navegação */}
          <nav className="nav">
            <button
              id="nav-home"
              className={`nav-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </button>
            <button
              id="nav-funcionarios"
              className={`nav-btn ${activePage === 'funcionarios' ? 'active' : ''}`}
              onClick={() => handleNavClick('funcionarios')}
            >
              <i className="fas fa-users"></i>
              <span>Funcionários</span>
            </button>
            <button
              id="nav-sobre"
              className={`nav-btn ${activePage === 'sobre' ? 'active' : ''}`}
              onClick={() => handleNavClick('sobre')}
            >
              <i className="fas fa-info-circle"></i>
              <span>Sobre</span>
            </button>
            <button
              id="nav-faq"
              className={`nav-btn ${activePage === 'faq' ? 'active' : ''}`}
              onClick={() => handleNavClick('faq')}
            >
              <i className="fas fa-question-circle"></i>
              <span>FAQ</span>
            </button>
            <button
              id="nav-devtools"
              className={`nav-btn ${activePage === 'devtools' ? 'active' : ''}`}
              onClick={() => handleNavClick('devtools')}
            >
              <i className="fas fa-tools"></i>
              <span>Dev Tools</span>
            </button>
          </nav>

          {/* Botão Login */}
          <button
            id="btn-login"
            className="login-btn"
            onClick={() => handleNavClick('login')}
          >
            <i className="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="page-content">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          {/* Logo e Descrição */}
          <div>
            <div className="footer-logo">
              <i className="fas fa-hotel"></i>
              <span>Hotel Cocao</span>
            </div>
            <p className="footer-description">
              Conforto e elegância para sua estadia perfeita.
            </p>
          </div>

          {/* Contatos */}
          <div className="footer-section">
            <h3>Contatos</h3>
            <ul>
              <li><i className="fas fa-phone"></i>(11) 3456-7890</li>
              <li><i className="fas fa-envelope"></i>contato@hotelcocao.com</li>
              <li><i className="fas fa-map-marker-alt"></i>Av. Oceânica, 123 - São Paulo, SP</li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div className="footer-section">
            <h3>Links Úteis</h3>
            <ul>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Suporte</a></li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="footer-section">
            <h3>Redes Sociais</h3>
            <div className="social-links">
              <a href="#" className="social-icon facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon whatsapp"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© 2024 Hotel Cocao. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;