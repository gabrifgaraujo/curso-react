import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

interface BackButtonProps {
  backText: string;
  backRoute: string;
}

const BackButton: React.FC<BackButtonProps> = ({ backText, backRoute }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'}); // scroll pro topo da pagina
  }

  return ( 
    <Link to={backRoute} onClick={handleClick} className="mt-10">
      <div className="text-center cursor-pointer">
        <div className="inline-flex items-center bg-gradient-to-r from-purple-700 to-blue-700 px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 hover:border-white-300">
          <IoMdArrowRoundBack />
          <button className="text-lg font-medium text-white cursor-pointer">{backText}</button>
        </div>
      </div>
    </Link>
  );
}

export default BackButton;
