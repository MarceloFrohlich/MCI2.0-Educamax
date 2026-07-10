import { getAllCopas } from "../../actions/copas/copas";
import Reports from "../../components/relatorios/reports";

const Relatorios: React.FC = async () => {

    const copas = await getAllCopas();
    
    return (
        <section className="mx-8">
            <h1 className="font-bold mb-4">Relatórios</h1>

            <Reports copas={copas} />
        </section>
    )
}

export default Relatorios