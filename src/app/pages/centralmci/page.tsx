'use client'

import CreateEditGameModal from "../../components/CentralMCI/createEditGameModal";
import FilterCard from "../../components/utils/filterCard";
import GameModal from "../../components/CentralMCI/gameModal";
import ManageCupModal from "../../components/CentralMCI/manageCupModal";
import ManageLeaderModal from "../../components/CentralMCI/manageLeaderModal";
import { leaders, mockedGames } from "../../mocks/mocks";

const CentralMCI: React.FC = () => {

    const games = mockedGames

    return (
        <section className="mx-8 text-(--textBaseColor) relative z-50">
            <h1 className="font-bold">Central MCI</h1>

            <div className="my-4 flex gap-4 relative z-50">
                <ManageCupModal />
                <CreateEditGameModal leaders={leaders} />
                <ManageLeaderModal />
            </div>

            <div className="flex gap-4">
                <FilterCard title={<div><span className="font-bold">PESQUISAR</span><br />POR NOME</div>} />
                <FilterCard title={<span className="font-bold">INSTITUIÇÃO</span>} />
                <FilterCard title={<span className="font-bold">DATA</span>} />
                <FilterCard title={<span className="font-bold">LIDER</span>} />
            </div>

            <div className="mt-4 flex gap-4 flex-wrap">
                {games && games.map((game) => (
                    <GameModal
                        key={game.id}
                        game={game}
                    />
                ))}
            </div>
        </section>
    )
}

export default CentralMCI;