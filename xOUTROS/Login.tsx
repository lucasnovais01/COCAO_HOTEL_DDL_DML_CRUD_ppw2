import React from 'react';

const Login: React.FC = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-center mb-8">Login</h1>
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <form>
        <input type="email" placeholder="E-mail" className="w-full p-3 mb-4 border rounded-lg" />
        <input type="password" placeholder="Senha" className="w-full p-3 mb-6 border rounded-lg" />
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  </div>
);

export default Login;