import hooks from '../assets/03_hooks_essenciais.md'; 
import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";

const Hooks: React.FC = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/fundamentos" backText="Voltar"/>
            <GoButton goRoute="/roteamento" goText="Próximo: Roteamento!"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={hooks} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/fundamentos" backText="Voltar"/>
            <GoButton goRoute="/roteamento" goText="Próximo: Roteamento!"/>
        </div>
        </>
     );
}
 
export default Hooks;