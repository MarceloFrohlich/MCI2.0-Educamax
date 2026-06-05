import { getAlljogos } from "../../actions/jogos/jogos"
import UpdateGameCard from "../../components/atualizacao/updateGameCard"
import FilterCard from "../../components/utils/filterCard"
import { mockedGames } from "../../mocks/mocks"

const Indicadores:React.FC = async () => {

    const games = await getAlljogos()

    return (
        <section className="flex flex-col gap-4 w-full">
            <p><span className="font-bold">Atualização -</span> Semanal</p>
            <p className="leading-4.5 text-sm">Busque pelo <br/> seu <span className="text-(--colorVariantBlue) font-bold">jogo</span></p>


            <div className="flex gap-4">
                <FilterCard title={<div><span className="font-bold">PESQUISAR</span><br />POR NOME</div>} />
                <FilterCard title={<span className="font-bold">INSTITUIÇÃO</span>} />
                <FilterCard title={<span className="font-bold">DATA</span>} />
                <FilterCard title={<span className="font-bold">LIDER</span>} />
            </div>

            {games && games.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                    {games.map((game) => (
                        <UpdateGameCard key={game.id_jogo} game={game} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Indicadores