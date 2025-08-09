import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import estilizacao from "../assets/07_estilizacao.md";

const Estilizacao: React.FC = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/consumo-api" backText="Voltar"/>
            <GoButton goRoute="/testes" goText="Próximo: Testando Aplicações!"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={estilizacao} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/consumo-api" backText="Voltar"/>
            <GoButton goRoute="/testes" goText="Próximo: Testando Aplicações!"/>
        </div>
        </>
     );
}
 
export default Estilizacao;
