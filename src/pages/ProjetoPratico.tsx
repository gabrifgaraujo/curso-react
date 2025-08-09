import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import projeto from '../assets/10_projeto_pratico_todolist.md';

const ProjetoPratico: React.FC = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/vite" backText="Voltar"/>
            <GoButton goRoute="/dicas" goText="Próximo: Dicas de Vagas!"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={projeto} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/vite" backText="Voltar"/>
            <GoButton goRoute="/dicas" goText="Próximo: Dicas de Vagas!"/>
        </div>
        </>
     );
}
 
export default ProjetoPratico;