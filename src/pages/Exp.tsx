import React from "react";
import {
  FaReact,
  FaCode,
  FaCogs,
  FaRoute,
  FaDatabase,
  FaGraduationCap,
  FaServer,
  FaPalette,
  FaFlask,
  FaRocket,
  FaTasks,
  FaUserTie,
} from "react-icons/fa";
import { Link } from 'react-router-dom';


type Topic = {
  id: number;
  title: string;
  description: string[];
  icon: React.ReactNode;
  gradientFromClass: string;
  gradientToClass: string;
  textColorClass: string;
  link: string;
};

const topics: Topic[] = [
  {
    id: 1,
    title: "Introdução ao React e Vite",
    description: [
      "O que é React e seus principais conceitos",
      "Vantagens do Vite como ferramenta de build",
      "Configuração inicial do ambiente de desenvolvimento",
    ],
    icon: <FaReact className="text-xl text-white" />,
    gradientFromClass: "from-blue-500",
    gradientToClass: "to-cyan-500",
    textColorClass: "text-blue-400",
    link: "/intro",
  },
  {
    id: 2,
    title: "Fundamentos do React",
    description: [
      "Componentes funcionais e baseados em classe",
      "JSX e sua sintaxe",
      "Props e passagem de dados",
      "Estado e ciclo de vida dos componentes",
    ],
    icon: <FaCode className="text-xl text-white" />,
    gradientFromClass: "from-green-500",
    gradientToClass: "to-emerald-500",
    textColorClass: "text-green-400",
    link: "/fundamentos",
  },
  {
    id: 3,
    title: "Hooks Essenciais",
    description: [
      "useState para gerenciamento de estado",
      "useEffect para efeitos colaterais",
      "useContext para estado global",
      "useRef, useMemo e useCallback",
    ],
    icon: <FaCogs className="text-xl text-white" />,
    gradientFromClass: "from-yellow-500",
    gradientToClass: "to-amber-500",
    textColorClass: "text-yellow-400",
    link: "/hooks",
  },
  {
    id: 4,
    title: "Roteamento com React Router",
    description: [
      "Configuração básica de rotas",
      "Navegação programática",
      "Parâmetros de rota",
      "Rotas aninhadas",
    ],
    icon: <FaRoute className="text-xl text-white" />,
    gradientFromClass: "from-purple-500",
    gradientToClass: "to-fuchsia-500",
    textColorClass: "text-purple-400",
    link: "/roteamento",
  },
  {
    id: 5,
    title: "Gerenciamento de Estado Avançado",
    description: [
      "Context API e suas limitações",
      "Visão geral de Redux e Redux Toolkit",
      "Alternativas modernas: Zustand e Jotai",
    ],
    icon: <FaDatabase className="text-xl text-white" />,
    gradientFromClass: "from-pink-500",
    gradientToClass: "to-rose-500",
    textColorClass: "text-pink-400",
    link: "/gerenciamento-estado",
  },
  {
    id: 6,
    title: "Consumindo APIs Externas",
    description: [
      "Fetch API nativa",
      "Axios como alternativa",
      "Tratamento de respostas e erros",
      "Cancelamento de requisições",
    ],
    icon: <FaServer className="text-xl text-white" />,
    gradientFromClass: "from-indigo-500",
    gradientToClass: "to-violet-500",
    textColorClass: "text-indigo-400",
    link: "/consumo-api",
  },
  {
    id: 7,
    title: "Estilização de Componentes",
    description: [
      "CSS Padrão e CSS Modules",
      "Styled Components (CSS-in-JS)",
      "Tailwind CSS (Utility-First)",
    ],
    icon: <FaPalette className="text-xl text-white" />,
    gradientFromClass: "from-teal-500",
    gradientToClass: "to-cyan-500",
    textColorClass: "text-teal-400",
    link: "/estilizacao",
  },
  {
    id: 8,
    title: "Testando Aplicações React",
    description: [
      "Jest/Vitest e React Testing Library",
      "Testes unitários e de integração",
      "Mocking de dependências",
    ],
    icon: <FaFlask className="text-xl text-white" />,
    gradientFromClass: "from-red-500",
    gradientToClass: "to-orange-500",
    textColorClass: "text-red-400",
    link: "/testes",
  },
  {
    id: 9,
    title: "Desenvolvimento e Build com Vite",
    description: [
      "Configurações avançadas",
      "Otimizações de performance",
      "Preparação para produção",
    ],
    icon: <FaRocket className="text-xl text-white" />,
    gradientFromClass: "from-blue-600",
    gradientToClass: "to-sky-500",
    textColorClass: "text-sky-400",
    link: "/vite",
  },
  {
    id: 10,
    title: "Projeto Prático: To-Do List",
    description: [
      "Implementação passo a passo",
      "Aplicação dos conceitos aprendidos",
    ],
    icon: <FaTasks className="text-xl text-white" />,
    gradientFromClass: "from-emerald-500",
    gradientToClass: "to-green-500",
    textColorClass: "text-emerald-400",
    link: "/projeto-pratico",
  },
  {
    id: 11,
    title: "Dicas para Vagas Júnior",
    description: [
      "Preparação para entrevistas",
      "Portfólio e projetos relevantes",
      "Habilidades valorizadas pelo mercado",
    ],
    icon: <FaUserTie className="text-xl text-white" />,
    gradientFromClass: "from-amber-500",
    gradientToClass: "to-yellow-500",
    textColorClass: "text-amber-400",
    link: "/dicas",
  },
];


const Exp: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto my-12 p-6">
      <header className="text-center mb-16">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-full mb-6">
          <div className="bg-gray-900 rounded-full p-3">
            <FaGraduationCap className="text-4xl text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Guia Completo de React com Vite
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Um guia abrangente para desenvolvedores com experiência em HTML, CSS e
          JavaScript básico que desejam dominar React e se preparar para vagas
          de desenvolvedor júnior.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { icon: <FaReact className="text-blue-400 text-xl" />, label: "Componentes" },
            { icon: <FaCode className="text-green-400 text-xl" />, label: "JSX" },
            { icon: <FaCogs className="text-yellow-400 text-xl" />, label: "Hooks" },
            { icon: <FaRoute className="text-purple-400 text-xl" />, label: "React Router" },
            { icon: <FaDatabase className="text-pink-400 text-xl" />, label: "Gerenciamento de Estado" },
          ].map(({ icon, label }, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 bg-gradient-to-br from-gray-800 to-gray-900 px-5 py-3 rounded-xl shadow-lg border border-gray-700"
            >
              {icon}
              <span className="text-gray-200 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map(
          ({
            id,
            title,
            description,
            icon,
            gradientFromClass,
            gradientToClass,
            textColorClass,
            link
          }) => (
          <article
            key={id}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
          >
            <div className="flex items-center mb-5">
              <div
                className={`p-2 rounded-lg mr-4 bg-gradient-to-r ${gradientFromClass} ${gradientToClass}`}
              >
                {icon}
              </div>
              <h2 className={`text-xl font-bold ${textColorClass}`}>{`${id}. ${title}`}</h2>
            </div>
        
            <ul className="space-y-3">
              {description.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className={`${textColorClass} mr-2`}>•</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
        
            {/* Link invisível que cobre todo o card */}
            <Link to={link} className="absolute inset-0 rounded-2xl" />
          </article>
          )
        )}
      </section>
    </div>
  );
};

export default Exp;
