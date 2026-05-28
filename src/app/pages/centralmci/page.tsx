import CreateEditGameModal from "../../components/CentralMCI/createEditGameModal";
import FilterCard from "../../components/utils/filterCard";
import GameModal from "../../components/CentralMCI/gameModal";
import ManageCupModal from "../../components/CentralMCI/manageCupModal";
import ManageLeaderModal from "../../components/CentralMCI/manageLeaderModal";
import { mockedGames } from "../../mocks/mocks";
import { getAllLideres } from "../../actions/lideres/lideres";
import { getAllDepartamentos } from "../../actions/cadastros/departamentos";
import { getAllCopas } from "../../actions/copas/copas";

export default async function CentralMCI() {

    const games = mockedGames;
    const copas = await getAllCopas()
    const departamentos = await getAllDepartamentos()
    const lideres = await getAllLideres();

    return (
        <section className="mx-8 text-(--textBaseColor) relative z-50">
            <h1 className="font-bold">Central MCI</h1>

            <div className="my-4 flex justify-between gap-4 relative z-50">
                <div className="flex ">
                    <ManageCupModal leaders={lideres} departamentos={departamentos} copas={copas} />
                    <CreateEditGameModal leaders={lideres} copas={copas} />
                    <ManageLeaderModal leader={lideres} />
                </div>
                <div className="flex gap-4 justify-end items-center flex-1">
                    <label
                        htmlFor="copas"
                        className="text-sm font-medium text-gray-700"
                    >
                        Filtrar Copa
                    </label>
                    <select className="
                                bg-white
                                w-1/4
                                rounded-xl
                                py-2
                                px-4
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            ">
                        <option value=''>Selecione</option>
                        {copas && copas.map(copa => (
                            <option key={copa.id_copa} value={copa.id_copa}>{copa.nome}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-4">
                <FilterCard title={<div><span className="font-bold">PESQUISAR</span><br />POR NOME</div>} />
                <FilterCard title={<span className="font-bold">INSTITUIÇÃO</span>} />
                <FilterCard title={<span className="font-bold">DATA</span>} />
                <FilterCard title={<span className="font-bold">LIDER</span>} />
            </div>

            <div className="mt-4 flex gap-4 flex-wrap">
                {games?.map((game) => (
                    <GameModal
                        key={game.id}
                        game={game}
                    />
                ))}
            </div>
        </section>
    );
}