import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import vite from '../assets/09_desenvolvendo_e_fazendo_build_com_vite.md';

const Vite = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/testes" backText="Voltar"/>
            <GoButton goRoute="/projeto-pratico" goText="Próximo: Projeto Prático!"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={vite} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/testes" backText="Voltar"/>
            <GoButton goRoute="/projeto-pratico" goText="Próximo: Projeto Prático!"/>
        </div>
        </>
     );
}
 
export default Vite;