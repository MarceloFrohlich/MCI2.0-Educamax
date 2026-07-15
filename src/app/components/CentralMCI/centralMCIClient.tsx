'use client';

import { useState } from 'react';
import FilterCard from '../../components/utils/filterCard';
import GameModal from '../../components/CentralMCI/gameModal';
import { getJogosFiltrados } from '../../actions/jogos/jogos';
import ManageCupModal from './manageCupModal';
import CreateEditGameModal from './createEditGameModal';
import ManageLeaderModal from './manageLeaderModal';
import { ICup, IGame, ILeader } from '../../types/centralMCI/centralMCI';
import { IDepartamento } from '../../types/cadastros/cadastros';

interface ICentralMCIClient {
    initialGames: IGame[]
    lideres: ILeader[]
    departamentos: IDepartamento[]
    copas: ICup[]
}

export const CentralMCIClient: React.FC<ICentralMCIClient> = ({ copas, departamentos, initialGames, lideres }) => {
    const [games, setGames] = useState(initialGames);

    const [filters, setFilters] = useState({
        nome: '',
        id_lider: '',
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
                    <ManageCupModal leaders={lideres} departamentos={departamentos} copas={copas} />
                    <CreateEditGameModal leaders={lideres} copas={copas} />
                    <ManageLeaderModal leader={lideres} />
                </div>
                <div className="flex gap-4 justify-end items-center flex-1 z-20">
                    <label
                        htmlFor="copas"
                        className="text-sm font-medium text-gray-700"
                    >
                        Filtrar por Copa
                    </label>
                    <select
                        onChange={(e) => handleFilterChange("id_copa", e.target.value)}
                        className="
                                bg-white
                                w-full min-w-0 max-w-full md:w-auto md:min-w-1/4
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
                        {copas && copas.map((copa: ICup) => (
                            <option key={copa.id_copa} value={copa.id_copa}>{`${copa.departamento.nome} - ${copa.nome}`}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-4">
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
                    param="id_lider"
                    type="select"
                    title="LÍDER"
                    value={filters.id_lider}
                    options={lideres.map((l: any) => ({
                        value: String(l.id_lider),
                        label: l.nome,
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
                        departamentos={departamentos}
                        copas={copas}
                    />
                ))}
            </div>
        </>
    );
}