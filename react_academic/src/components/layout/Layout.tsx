// src/components/layout/Layout.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* HEADER FIXO (seu estilo original) */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <i className="fas fa-hotel"></i>
            <span>Hotel Cocao</span>
          </div>

          <nav className="nav">
            <Link to="/devtools" className="nav-btn active">
              <i className="fas fa-tools"></i> <span>Dev Tools</span>
            </Link>
          </nav>

          <button className="login-btn">
            <i className="fas fa-sign-in-alt"></i> <span>Login</span>
          </button>
        </div>
      </header>

      {/* CONTEÚDO (espaço para header) */}
      <div className="page-content">
        {children}
      </div>

      {/* FOOTER (seu estilo original) */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">
            <i className="fas fa-hotel"></i> <span>Hotel Cocao</span>
          </div>
          <p className="footer-description">Conforto e elegância para sua estadia perfeita.</p>

          <div className="footer-section">
            <h3>Contatos</h3>
            <p><i className="fas fa-phone"></i> (11) 3456-7890</p>
            <p><i className="fas fa-envelope"></i> contato@hotelcocao.com</p>
            <p><i className="fas fa-map-marker-alt"></i> Av. Oceânica, 123 - São Paulo, SP</p>
          </div>

          <div className="footer-section">
            <h3>Links Úteis</h3>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
            <a href="#">FAQ</a>
            <a href="#">Suporte</a>
          </div>

          <div className="footer-section">
            <h3>Redes Sociais</h3>
            <div className="social-links">
              <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© 2025 Hotel Cocao. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}