'use client';

import { useState } from 'react';
import FilterCard from '../../components/utils/filterCard';
import GameModal from '../../components/CentralMCI/gameModal';
import { getJogosFiltrados } from '../../actions/jogos/jogos';
import ManageCupModal from './manageCupModal';
import CreateEditGameModal from './createEditGameModal';
import ManageLeaderModal from './manageLeaderModal';
import { ICup, IGame, ILeader } from '../../types/centralMCI/centralMCI';
import { IDepartamento, IUser } from '../../types/cadastros/cadastros';

interface ICentralMCIClient {
    initialGames: IGame[]
    lideres: ILeader[]
    usuarios: IUser[]
    departamentos: IDepartamento[]
    copas: ICup[]
}

export const CentralMCIClient: React.FC<ICentralMCIClient> = ({ copas, departamentos, initialGames, lideres, usuarios }) => {
    const [games, setGames] = useState(initialGames);

    const [filters, setFilters] = useState({
        nome: '',
        id_departamento: '',
        id_copa: ''
    });

    const handleFilterChange = async (
        param: string,
        value: string
    ) => {
        const newFilters = {
            ...filters,
            [param]: value,
        };

        setFilters(newFilters);

        const data = await getJogosFiltrados(newFilters);
        setGames(data);
    };

    return (
        <>
            <div className="my-8 flex justify-between gap-4 relative">
                <div className="flex ">
                    <ManageCupModal departamentos={departamentos} copas={copas} />
                    <CreateEditGameModal leaders={lideres} usuarios={usuarios} copas={copas} />
                    <ManageLeaderModal leader={lideres} />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <FilterCard
                    param="nome"
                    title="PESQUISAR POR NOME"
                    value={filters.nome}
                    onChange={handleFilterChange}
                />

                <FilterCard
                    param="id_departamento"
                    type="select"
                    title="INSTITUIÇÃO"
                    value={filters.id_departamento}
                    options={departamentos.map((d: any) => ({
                        value: String(d.id_departamento),
                        label: d.nome,
                    }))}
                    onChange={handleFilterChange}
                />

                <FilterCard
                    param="id_copa"
                    type="select"
                    title="COPA"
                    value={filters.id_copa}
                    options={copas.map((copa: ICup) => ({
                        value: String(copa.id_copa),
                        label: `${copa.departamento.nome} - ${copa.nome}`,
                    }))}
                    onChange={handleFilterChange}
                />
            </div>

            <div className="mt-4 flex gap-4 flex-wrap">
                {games.map((game: any) => (
                    <GameModal
                        key={game.id_jogo}
                        game={game}
                        leaders={lideres}
                        usuarios={usuarios}
                        departamentos={departamentos}
                        copas={copas}
                    />
                ))}
            </div>
        </>
    );
}