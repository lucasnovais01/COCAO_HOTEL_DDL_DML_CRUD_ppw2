import { NavLink, Outlet } from "react-router-dom";
// Vantagem: O NavLink adiciona a classe active automaticamente.

export default function Layout() {
  return (
    <>
      {/* HEADER FIXO */}
      <header className="header">
        <div className="container">
          {/* Link para Dashboard (Home) */}
          <NavLink
            to="/sistema/dashboard"
            className="logo"
          >
            <i className="fas fa-hotel"></i>
            <span>Hotel Cocao</span>
          </NavLink>

          {/* Link para DevTools */}
          <NavLink
            to="/sistema/devtools"
            className="nav-btn"
          >
            <i className="fas fa-tools"></i>
            <span>DevTools</span>
          </NavLink>

          <button className="login-btn">
            <i className="fas fa-sign-in-alt"></i> <span>Login</span>
          </button>
        </div>

      </header>

      {/* CONTEÚDO (espaço, abaixo do header) */}
      <div className="page-content">
        <Outlet />
      </div>

      {/* FOOTER, simples */}
      <footer className="footer">
        <div className="container">
          <NavLink to="/sistema/dashboard" className="footer-logo">
            <i className="fas fa-hotel"></i> <span>Hotel Cocao</span>
          </NavLink>
          <p className="footer-description">Conforto e elegância para sua estadia perfeita.</p>

          <div className="footer-section">
            <h3>Contatos</h3>
            <p><i className="fas fa-phone"></i> (18) 99999-9999</p>
            <p><i className="fas fa-envelope"></i> contato@hotelcocao.com</p>
            <p><i className="fas fa-map-marker-alt"></i> Rua Pedro Cavalo, 709 - Residencial Portal da Pérola II, Birigui - SP, 16201-407</p>
          </div>

          <div className="footer-section">
            <h3>Links Úteis</h3>
            <NavLink 
              to="/sistema/dashboard"
              className={({ isActive }) => 
                isActive ? "text-blue-700" : "text-blue-600 hover:text-blue-700"
              }
            >
              Home
            </NavLink>
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
          <br></br>
          <p>Trabalho de escola ppw2 - IFSP - Campus Birigui</p>
        </div>
      </footer>
    </>
  );
}