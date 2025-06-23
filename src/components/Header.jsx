import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Estilo dinâmico baseado no scroll e na rota
  const isHomePage = location.pathname === '/';
  const headerStyle = isHomePage && !scrolled
    ? 'bg-transparent'
    : 'bg-gradient-to-r from-gray-900 to-blue-900 shadow-xl';

  return (
    <header className={`fixed w-full mb-20 top-0 z-50 transition-all duration-500 ${headerStyle} ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 z-50">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg">
              <div className="bg-gray-900 p-2 rounded-md">
                <i className="fab fa-react text-blue-400 text-2xl"></i>
              </div>
            </div>
            <span className="text-xl font-bold text-white">
              React<span className="text-blue-400">Mastery</span>
            </span>
          </Link>
          
          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-8">
            {[
              { path: '/', label: 'Introdução' },
              { path: '/summary', label: 'Sumário' },
              { path: '/sobre', label: 'Sobre' }
            ].map((item, index) => (
              <NavLink 
                key={index} 
                to={item.path} 
                currentPath={location.pathname}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          {/* Botão Mobile */}
          <button 
            className="md:hidden text-white z-50"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-8">
              {[
                { path: '/exp', label: 'Introdução' },
                { path: '/', label: 'Sumário' },
                { path: '#', label: 'Sobre' }
              ].map((item, index) => (
                <NavLink 
                  key={index} 
                  to={item.path} 
                  currentPath={location.pathname}
                  onClick={closeMenu}
                  mobile
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Componente auxiliar para links de navegação
const NavLink = ({ to, children, currentPath, onClick, mobile = false }) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-1 py-2 font-medium transition-all duration-300 ${
        mobile 
          ? 'text-2xl' 
          : 'text-lg'
      } ${
        isActive 
          ? 'text-blue-400' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
      )}
    </Link>
  );
};

export default Header;