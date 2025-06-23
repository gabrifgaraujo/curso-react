import { Link } from 'react-router-dom';
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
import { FaArrowRight } from "react-icons/fa";

const GoButton = ({goText, goRoute}) => {
    return ( 
        <Link to={goRoute} className="mt-10">
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