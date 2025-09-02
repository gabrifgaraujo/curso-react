import ReactMarkdown from 'react-markdown';
import introducao from '../assets/01_introducao.md'; 
import Markdown from "../components/Markdown";
import Fundamentos from './Fundamentos';
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";

const Intro: React.FC = () => {
  return (
    <>
      <div className="flex gap-3 mt-15 mb-0">
        <BackButton backRoute="/." backText="Voltar"/>
        <GoButton goRoute="/fundamentos" goText="Próximo: Fundamentos"/>
      </div>
      <div className="flex flex-col items-center">
        <Markdown content={introducao} />
      </div>
      <div className="flex gap-3 mt-15 mb-0">
        <BackButton backRoute="/." backText="Voltar"/>
        <GoButton goRoute="/fundamentos" goText="Próximo: Fundamentos"/>
      </div>
    </>
  );
};

export default Intro