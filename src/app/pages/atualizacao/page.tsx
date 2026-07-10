import { getAllDepartamentos } from "../../actions/cadastros/departamentos"
import { getAllCopas } from "../../actions/copas/copas"
import { getAlljogos } from "../../actions/jogos/jogos"
import { getAllLideres } from "../../actions/lideres/lideres"
import { CentralAtualizacaoClient } from "../../components/atualizacao/centralAtualizacaoClient"

const Indicadores:React.FC = async () => {

    const games = await getAlljogos()
    const lideres = await getAllLideres()
    const copas = await getAllCopas()
    const departamentos = await getAllDepartamentos()

    return (
        <section className="flex flex-col gap-4 w-full">
            <p><span className="font-bold">Atualização -</span> Semanal</p>
            <p className="leading-4.5 text-sm">Busque pelo <br/> seu <span className="text-(--colorVariantBlue) font-bold">jogo</span></p>


            <CentralAtualizacaoClient copas={copas} departamentos={departamentos} initialGames={games} lideres={lideres} />
        </section>
    )
}

export default Indicadores