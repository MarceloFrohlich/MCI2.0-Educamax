import { getAllCopas } from "../../../actions/copas/copas";
import AnaliseReports from "../../../components/relatorios/analiseReports";

const Analise: React.FC = async () => {

    const copas = await getAllCopas();

    return (
        <section className="mx-8">
            <h1 className="font-bold mb-4">Análise</h1>

            <AnaliseReports copas={copas} />
        </section>
    )
}

export default Analise
