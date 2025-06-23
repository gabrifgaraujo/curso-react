import sumario from '../assets/guia_react_vite_estrutura.md';
import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";

const Summary = () => {
  return (
            <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/." backText="Voltar"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={sumario} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/." backText="Voltar"/>
        </div>
        </>
  );
};

export default Summary;