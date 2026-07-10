'use client';

import { useEffect, useState } from 'react';
import FilterCard from '../utils/filterCard';
import { getJogosFiltrados } from '../../actions/jogos/jogos';
import { ICup, IGame, ILeader } from '../../types/centralMCI/centralMCI';
import { IDepartamento } from '../../types/cadastros/cadastros';
import UpdateGameCard from './updateGameCard';

interface ICentralMCIClient {
    initialGames: IGame[]
    lideres: ILeader[]
    departamentos: IDepartamento[]
    copas: ICup[]
}

export const CentralAtualizacaoClient: React.FC<ICentralMCIClient> = ({ copas, departamentos, initialGames, lideres }) => {
    const [games, setGames] = useState(initialGames);

    const [filters, setFilters] = useState({
        nome: '',
        id_lider: '',
        id_departamento: '',
        id_copa: ''
    });

    useEffect(() => {
        const hasActiveFilters =
            Object.values(filters).some(Boolean);

        if (!hasActiveFilters) {
            setGames(initialGames);
            return;
        }

        getJogosFiltrados(filters).then(setGames);
    }, [initialGames]);

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

            <div className="flex gap-4 justify-between">
                <div className='flex gap-4'>
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
                <div>
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
                                min-w-1/4
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
            </div>

            <div className="mt-4 flex gap-4 flex-wrap">
                {games.map((game: IGame) => (
                    <UpdateGameCard game={game} key={game.id_jogo} />
                ))}
            </div>
        </>
    );
}