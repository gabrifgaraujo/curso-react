import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import proximospassos from '../assets/12_proximos_passos.md';

const Dicas = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/dicas" backText="Voltar"/>
            <GoButton goRoute="/requisitos" goText="Próximo: Requisitos para Vagas"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={proximospassos} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/dicas" backText="Voltar"/>
            <GoButton goRoute="/requisitos" goText="Próximo: Requisitos para Vagas"/>
        </div>
        </>
     );
}
 
export default Dicas;