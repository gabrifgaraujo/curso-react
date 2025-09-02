import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import dicas from '../assets/11_dicas_vaga_junior.md';

const Dicas: React.FC = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/projeto-pratico" backText="Voltar"/>
            <GoButton goRoute="/proximospassos" goText="Próximo: Próximos Passos"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={dicas} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/projeto-pratico" backText="Voltar"/>
            <GoButton goRoute="/proximospassos" goText="Próximo: Próximos Passos"/>
        </div>
        </>
     );
}
 
export default Dicas;