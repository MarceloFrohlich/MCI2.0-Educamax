import { getAllDepartamentos } from "../../actions/cadastros/departamentos";
import {
    getAlljogos,
    getJogosFiltrados,
} from "../../actions/jogos/jogos";
import { getAllLideres } from "../../actions/lideres/lideres";

import Filters from "../../components/reuniaoMCI/filters";
import Graphcard from "../../components/reuniaoMCI/graphcard";

import { IDepartamento } from "../../types/cadastros/cadastros";
import { IGame, ILeader } from "../../types/centralMCI/centralMCI";

interface Props {
    searchParams: Promise<{
        id_departamento?: string;
        id_lider?: string;
    }>;
}

const ReuniaoMCI = async ({ searchParams }: Props) => {
    const params = await searchParams;

    const departamentos: IDepartamento[] =
        await getAllDepartamentos();

    const lideres: ILeader[] =
        await getAllLideres();

    const games: IGame[] =
        params.id_departamento || params.id_lider
            ? await getJogosFiltrados({
                  id_departamento:
                      params.id_departamento,
                  id_lider: params.id_lider,
              })
            : await getAlljogos();

    return (
        <section className="flex flex-col gap-4 w-full pe-4">
            <p>
                <span className="font-bold">
                    Reunião -
                </span>{" "}
                MCI
            </p>

            <Filters
                departamentos={departamentos}
                lideres={lideres}
            />

            {games.map((game, index) => (
                <Graphcard
                    key={game.id_jogo}
                    index={index + 1}
                    game={game}
                />
            ))}
        </section>
    );
};

export default ReuniaoMCI;