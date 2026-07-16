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

            <div className="flex flex-wrap gap-4 justify-between">
                <div className='flex flex-wrap gap-4'>
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
            </div>

            <div className="mt-4 flex gap-4 flex-wrap">
                {games.map((game: IGame) => (
                    <UpdateGameCard game={game} key={game.id_jogo} />
                ))}
            </div>
        </>
    );
}