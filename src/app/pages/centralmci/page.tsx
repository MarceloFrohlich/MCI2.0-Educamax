import { getAlljogos } from '../../actions/jogos/jogos';
import { getAllLideres } from '../../actions/lideres/lideres';
import { getAllDepartamentos } from '../../actions/cadastros/departamentos';
import { CentralMCIClient } from '../../components/CentralMCI/centralMCIClient';
import { getAllCopas } from '../../actions/copas/copas';
import { getAllUsuarios } from '../../actions/cadastros/usuarios';


export default async function CentralMCI() {
    const games = await getAlljogos();
    const lideres = await getAllLideres();
    const departamentos = await getAllDepartamentos();
    const copas = await getAllCopas()
    // GET /usuarios é restrito a admin global/local; usuário comum só visualiza
    // o Central MCI, então aqui o grupo "líderes usuário" fica vazio pra ele.
    const usuarios = await getAllUsuarios().catch(() => []);

    return (
        <section className="mx-8">
            <h1 className="font-bold mb-4">Central MCI</h1>

            <CentralMCIClient
                copas={copas}
                initialGames={games}
                lideres={lideres}
                departamentos={departamentos}
                usuarios={usuarios}
            />
        </section>
    );
}