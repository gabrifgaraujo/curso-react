import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import consumoAPI from "../assets/06_consumindo_apis.md";

const ConsumoAPI: React.FC = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/gerenciamento-estado" backText="Voltar"/>
            <GoButton goRoute="/estilizacao" goText="Próximo: Estilização!"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={consumoAPI} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/gerenciamento-estado" backText="Voltar"/>
            <GoButton goRoute="/estilizacao" goText="Próximo: Estilização!"/>
        </div>
        </>
     );
}
 
export default ConsumoAPI;
