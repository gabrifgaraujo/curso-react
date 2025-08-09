// components/ContinueButton.tsx
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import React from 'react';

const ContinueButton: React.FC = () => {
  const lastRoute = localStorage.getItem('lastRoute');

  if (!lastRoute || lastRoute === "/") return null; // Não exibe se nunca navegou

  return (
    <div className="text-center mt-8">
      <Link
        to={lastRoute}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-blue-700 px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-700 transition-transform"
      >
        <FaArrowRight />
        <span className="text-lg font-medium text-white">Continuar de onde parou</span>
      </Link>
    </div>
  );
};

export default ContinueButton;
