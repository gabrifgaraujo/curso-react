import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

interface GoButtonProps {
  goText: string;
  goRoute: string;
}

const GoButton: React.FC<GoButtonProps> = ({ goText, goRoute }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'}); //faz subir pro topo a pagina
  }

  return ( 
    <Link to={goRoute} onClick={handleClick} className="mt-10">
      <div className="text-center cursor-pointer">
        <div className="inline-flex items-center bg-gradient-to-r from-purple-700 to-blue-700 px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 hover:border-white-300">
          <FaArrowRight />
          <button className="text-lg font-medium text-white cursor-pointer">{goText}</button>
        </div>
      </div>
    </Link>
  );
}

export default GoButton;
