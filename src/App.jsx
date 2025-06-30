import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Exp from './pages/Exp';
import Intro from './pages/Intro';
import Summary from './components/Summary';
import Fundamentos from './pages/Fundamentos';
import Hooks from './pages/Hooks';
import Roteamento from './pages/Roteamento';
import GerenciamentoEstado from './pages/GerenciamentoEstado';
import ConsumoAPI from './pages/ConsumoAPI';
import Estilizacao from './pages/Estilizacao';
import Testes from './pages/Testes';
import Vite from './pages/Vite';
import ProjetoPratico from './pages/ProjetoPratico';
import Dicas from './pages/Dicas';
import ProximosPassos from './pages/ProximosPassos';
import Requisitos from './pages/Requisitos';
import Sobre from './components/Sobre';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/curso-react/" element={<Home />} />
            <Route path="/curso-react/curso-react/exp" element={<Exp />} />
            <Route path="/curso-react/curso-react/intro" element={<Intro />} />
            <Route path="/curso-react/curso-react/summary" element={<Summary />} />
            <Route path="/curso-react/curso-react/sobre" element={<Sobre />} />
            <Route path="/curso-react/curso-react/fundamentos" element={<Fundamentos />} />
            <Route path="/curso-react/curso-react/hooks" element={<Hooks />} />
            <Route path="/curso-react/curso-react/roteamento" element={<Roteamento />} />
            <Route path="/curso-react/curso-react/gerenciamento-estado" element={<GerenciamentoEstado />} />
            <Route path="/curso-react/curso-react/consumo-api" element={<ConsumoAPI />} />
            <Route path="/curso-react/curso-react/estilizacao" element={<Estilizacao />} />
            <Route path="/curso-react/curso-react/testes" element={<Testes />} />
            <Route path="/curso-react/curso-react/vite" element={<Vite />} />
            <Route path="/curso-react/curso-react/projeto-pratico" element={<ProjetoPratico />} />
            <Route path="/curso-react/curso-react/dicas" element={<Dicas />} />
            <Route path="/curso-react/curso-react/proximospassos" element={<ProximosPassos />} />
            <Route path="/curso-react/curso-react/requisitos" element={<Requisitos />} />
            <Route path="*" element={<div className="text-center text-red-500">Página não encontrada</div>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;