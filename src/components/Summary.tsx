import sumario from '../assets/guia_react_vite_estrutura.md';
import Markdown from "./Markdown";
import BackButton from "./BackButton";

const Summary: React.FC = () => {
  return (
    <>
      <div className="flex gap-3 mt-15 mb-0">
        <BackButton backRoute="/." backText="Voltar" />
      </div>
      <div className="flex flex-col items-center">
        <Markdown content={sumario as unknown as string} />
      </div>
      <div className="flex gap-3 mt-15 mb-0">
        <BackButton backRoute="/." backText="Voltar" />
      </div>
    </>
  );
};

export default Summary;
