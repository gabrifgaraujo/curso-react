import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import gerencia from "../assets/05_gerenciamento_estado_avancado.md";

const GerenciamentoEstado = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/roteamento" backText="Voltar"/>
            <GoButton goRoute="/consumo-api" goText="Próximo: Consumir API!"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={gerencia} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/roteamento" backText="Voltar"/>
            <GoButton goRoute="/consumo-api" goText="Próximo: Consumir API!"/>
        </div>
        </>
     );
}
 
export default GerenciamentoEstado;
