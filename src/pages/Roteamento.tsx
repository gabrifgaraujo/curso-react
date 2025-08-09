import roteamento from '../assets/04_roteamento.md'; 
import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";

const Roteamento: React.FC = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/hooks" backText="Voltar"/>
            <GoButton goRoute="/gerenciamento-estado" goText="Próximo: Gerenciamento de Estado Avançado!"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={roteamento} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/hooks" backText="Voltar"/>
            <GoButton goRoute="/gerenciamento-estado" goText="Próximo: Gerenciamento de Estado Avançado!"/>
        </div>          
        </>
     );
}
 
export default Roteamento;