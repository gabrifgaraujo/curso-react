import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import testes from '../assets/08_testando_aplicacoes_react.md';

const Testes: React.FC = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/estilizacao" backText="Voltar"/>
            <GoButton goRoute="/vite" goText="Próximo: Utilizando Vite"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={testes} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/estilizacao" backText="Voltar"/>
            <GoButton goRoute="/vite" goText="Próximo: Utilizando Vite"/>
        </div>
        </>
     );
}
 
export default Testes;