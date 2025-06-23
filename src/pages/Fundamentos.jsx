import fundamentos from '../assets/02_fundamentos_react.md'; 
import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";

const Fund = () => {
  return (
    <>
      <div className="flex gap-3 mt-15 mb-0">
        <BackButton backRoute="/intro" backText="Voltar"/>
        <GoButton goRoute="/hooks" goText="Próximo: Hooks!"/>
      </div>
      <div className="flex flex-col items-center">
        <Markdown content={fundamentos} />
      </div>
      <div className="flex gap-3 mt-15 mb-0">
        <BackButton backRoute="/intro" backText="Voltar"/>
        <GoButton goRoute="/hooks" goText="Próximo: Hooks!"/>
      </div>
    </>
  );
};

export default Fund