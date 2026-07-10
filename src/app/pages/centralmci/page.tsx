import { getAlljogos } from '../../actions/jogos/jogos';
import { getAllLideres } from '../../actions/lideres/lideres';
import { getAllDepartamentos } from '../../actions/cadastros/departamentos';
import { CentralMCIClient } from '../../components/CentralMCI/centralMCIClient';
import { getAllCopas } from '../../actions/copas/copas';


export default async function CentralMCI() {
    const games = await getAlljogos();
    const lideres = await getAllLideres();
    const departamentos = await getAllDepartamentos();
    const copas = await getAllCopas()

    return (
        <section className="mx-8">
            <h1 className="font-bold mb-4">Central MCI</h1>

            <CentralMCIClient
                copas={copas}
                initialGames={games}
                lideres={lideres}
                departamentos={departamentos}
            />
        </section>
    );
}