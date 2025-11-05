import { ReactNode } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* SEU HEADER ORIGINAL (FIXO) */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <i className="fas fa-hotel text-3xl text-blue-700"></i>
            <span className="text-2xl font-bold text-gray-800">Hotel Cocao</span>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link
              to="/devtools"
              className="nav-btn active flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300"
            >
              <i className="fas fa-tools"></i>
              <span>Dev Tools</span>
            </Link>
            <Link
              to="/login"
              className="nav-btn flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300"
            >
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          </nav>

          <button className="login-btn flex items-center space-x-2 px-6 py-2 bg-blue-700 text-white rounded-lg transition-all duration-300 md:hidden">
            <i className="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="pt-20 min-h-screen bg-gray-50">
        {children}
      </div>

      {/* SEU FOOTER ORIGINAL */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-hotel text-3xl text-blue-400"></i>
                <span className="text-2xl font-bold">Hotel Cocao</span>
              </div>
              <p className="text-gray-400 text-sm">Conforto e elegância para sua estadia perfeita.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Contatos</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p><i className="fas fa-phone mr-2"></i>(11) 3456-7890</p>
                <p><i className="fas fa-envelope mr-2"></i>contato@hotelcocao.com</p>
                <p><i className="fas fa-map-marker-alt mr-2"></i>Av. Oceânica, 123 - São Paulo, SP</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Links Úteis</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">Política de Privacidade</a>
                <a href="#" className="block text-gray-400 hover:text-white">Termos de Uso</a>
                <a href="#" className="block text-gray-400 hover:text-white">FAQ</a>
                <a href="#" className="block text-gray-400 hover:text-white">Suporte</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="#" className="social-icon bg-gray-800 p-3 rounded-full hover:bg-blue-600">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="social-icon bg-gray-800 p-3 rounded-full hover:bg-pink-600">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="social-icon bg-gray-800 p-3 rounded-full hover:bg-blue-400">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="social-icon bg-gray-800 p-3 rounded-full hover:bg-green-600">
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-500 text-sm">© 2025 Hotel Cocao. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}