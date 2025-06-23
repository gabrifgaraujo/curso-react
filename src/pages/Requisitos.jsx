import Markdown from "../components/Markdown";
import GoButton from "../components/GoButton";
import BackButton from "../components/BackButton";
import requisitos from '../assets/Requisitos.md';

const Requisitos = () => {
    return ( 
        <>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/proximospassos" backText="Voltar"/>
            <GoButton goRoute="/." goText="Voltar pro início"/>
        </div>
        <div className="flex flex-col items-center">
            <Markdown content={requisitos} />
        </div>
        <div className="flex gap-3 mt-15 mb-0">
            <BackButton backRoute="/proximospassos" backText="Voltar"/>
            <GoButton goRoute="/." goText="Voltar pro início"/>
        </div>
        </>
     );
}
 
export default Requisitos;