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
    <BrowserRouter basename='/curso-react'>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exp" element={<Exp />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/fundamentos" element={<Fundamentos />} />
            <Route path="/hooks" element={<Hooks />} />
            <Route path="/roteamento" element={<Roteamento />} />
            <Route path="/gerenciamento-estado" element={<GerenciamentoEstado />} />
            <Route path="/consumo-api" element={<ConsumoAPI />} />
            <Route path="/estilizacao" element={<Estilizacao />} />
            <Route path="/testes" element={<Testes />} />
            <Route path="/vite" element={<Vite />} />
            <Route path="/projeto-pratico" element={<ProjetoPratico />} />
            <Route path="/dicas" element={<Dicas />} />
            <Route path="/proximospassos" element={<ProximosPassos />} />
            <Route path="/requisitos" element={<Requisitos />} />
            <Route path="*" element={<div className="text-center text-red-500">Página não encontrada</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;