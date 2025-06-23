import React from 'react';
import { 
  FaReact, 
  FaCode, 
  FaCogs, 
  FaRoute, 
  FaDatabase, 
  FaGraduationCap, 
  FaLightbulb, 
  FaServer, 
  FaPalette,
  FaFlask,
  FaRocket,
  FaTasks,
  FaUserTie
} from 'react-icons/fa';

const Exp = () => {
  return (    
    <div className="max-w-6xl mx-auto my-12 p-6">
      <div className="text-center mb-16">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-full mb-6">
          <div className="bg-gray-900 rounded-full p-3">
            <FaGraduationCap className="text-4xl text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Guia Completo de React com Vite
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Um guia abrangente para desenvolvedores com experiência em HTML, CSS e JavaScript básico que desejam dominar React e se preparar para vagas de desenvolvedor júnior.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2 bg-gradient-to-br from-gray-800 to-gray-900 px-5 py-3 rounded-xl shadow-lg border border-gray-700">
            <FaReact className="text-blue-400 text-xl" />
            <span className="text-gray-200 font-medium">Componentes</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-br from-gray-800 to-gray-900 px-5 py-3 rounded-xl shadow-lg border border-gray-700">
            <FaCode className="text-green-400 text-xl" />
            <span className="text-gray-200 font-medium">JSX</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-br from-gray-800 to-gray-900 px-5 py-3 rounded-xl shadow-lg border border-gray-700">
            <FaCogs className="text-yellow-400 text-xl" />
            <span className="text-gray-200 font-medium">Hooks</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-br from-gray-800 to-gray-900 px-5 py-3 rounded-xl shadow-lg border border-gray-700">
            <FaRoute className="text-purple-400 text-xl" />
            <span className="text-gray-200 font-medium">React Router</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-br from-gray-800 to-gray-900 px-5 py-3 rounded-xl shadow-lg border border-gray-700">
            <FaDatabase className="text-pink-400 text-xl" />
            <span className="text-gray-200 font-medium">Gerenciamento de Estado</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tópico 1 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg mr-4">
              <FaReact className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-400">1. Introdução ao React e Vite</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span className="text-gray-300">O que é React e seus principais conceitos</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span className="text-gray-300">Vantagens do Vite como ferramenta de build</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span className="text-gray-300">Configuração inicial do ambiente de desenvolvimento</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 2 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-4">
              <FaCode className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-400">2. Fundamentos do React</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span className="text-gray-300">Componentes funcionais e baseados em classe</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span className="text-gray-300">JSX e sua sintaxe</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span className="text-gray-300">Props e passagem de dados</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span className="text-gray-300">Estado e ciclo de vida dos componentes</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 3 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-2 rounded-lg mr-4">
              <FaCogs className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-yellow-400">3. Hooks Essenciais</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span className="text-gray-300">useState para gerenciamento de estado</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span className="text-gray-300">useEffect para efeitos colaterais</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span className="text-gray-300">useContext para estado global</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span className="text-gray-300">useRef, useMemo e useCallback</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 4 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-2 rounded-lg mr-4">
              <FaRoute className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-400">4. Roteamento com React Router</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span className="text-gray-300">Configuração básica de rotas</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span className="text-gray-300">Navegação programática</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span className="text-gray-300">Parâmetros de rota</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span className="text-gray-300">Rotas aninhadas</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 5 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg mr-4">
              <FaDatabase className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-pink-400">5. Gerenciamento de Estado Avançado</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span className="text-gray-300">Context API e suas limitações</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span className="text-gray-300">Visão geral de Redux e Redux Toolkit</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span className="text-gray-300">Alternativas modernas: Zustand e Jotai</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 6 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-500 p-2 rounded-lg mr-4">
              <FaServer className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-indigo-400">6. Consumindo APIs Externas</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span className="text-gray-300">Fetch API nativa</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span className="text-gray-300">Axios como alternativa</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span className="text-gray-300">Tratamento de respostas e erros</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span className="text-gray-300">Cancelamento de requisições</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 7 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg mr-4">
              <FaPalette className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-teal-400">7. Estilização de Componentes</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-teal-400 mr-2">•</span>
              <span className="text-gray-300">CSS Padrão e CSS Modules</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-400 mr-2">•</span>
              <span className="text-gray-300">Styled Components (CSS-in-JS)</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-400 mr-2">•</span>
              <span className="text-gray-300">Tailwind CSS (Utility-First)</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 8 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg mr-4">
              <FaFlask className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-red-400">8. Testando Aplicações React</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-red-400 mr-2">•</span>
              <span className="text-gray-300">Jest/Vitest e React Testing Library</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">•</span>
              <span className="text-gray-300">Testes unitários e de integração</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">•</span>
              <span className="text-gray-300">Mocking de dependências</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 9 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-2 rounded-lg mr-4">
              <FaRocket className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-sky-400">9. Desenvolvimento e Build com Vite</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-sky-400 mr-2">•</span>
              <span className="text-gray-300">Configurações avançadas</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-400 mr-2">•</span>
              <span className="text-gray-300">Otimizações de performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-400 mr-2">•</span>
              <span className="text-gray-300">Preparação para produção</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 10 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-2 rounded-lg mr-4">
              <FaTasks className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-emerald-400">10. Projeto Prático: To-Do List</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              <span className="text-gray-300">Implementação passo a passo</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              <span className="text-gray-300">Aplicação dos conceitos aprendidos</span>
            </li>
          </ul>
        </div>
        
        {/* Tópico 11 */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-2 rounded-lg mr-4">
              <FaUserTie className="text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-amber-400">11. Dicas para Vagas Júnior</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span className="text-gray-300">Preparação para entrevistas</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span className="text-gray-300">Portfólio e projetos relevantes</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span className="text-gray-300">Habilidades valorizadas pelo mercado</span>
            </li>
          </ul>
        </div>
      </div>
      

    </div>
  );
};

export default Exp;