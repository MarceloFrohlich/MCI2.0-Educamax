'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IDepartamento } from '../../types/cadastros/cadastros';
import { ILeader } from '../../types/centralMCI/centralMCI';

interface FiltersProps {
    departamentos: IDepartamento[];
    lideres: ILeader[];
}

export default function Filters({
    departamentos,
    lideres,
}: FiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleDepartmentChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        if (e.target.value) {
            params.set(
                'id_departamento',
                e.target.value
            );
        } else {
            params.delete('id_departamento');
        }

        router.replace(
            `?${params.toString()}`
        );
    };

    const handleLeaderChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        if (e.target.value) {
            params.set(
                'id_lider',
                e.target.value
            );
        } else {
            params.delete('id_lider');
        }

        router.replace(
            `?${params.toString()}`
        );
    };

    return (
        <div className="flex gap-4 items-center mt-4">
            <div className="flex gap-4 items-center flex-1">
                <p className="leading-4.5 text-sm pointer-events-none">
                    Busque pelo <br />
                    seu{' '}
                    <span className="text-(--colorVariantBlue) font-bold">
                        departamento
                    </span>
                </p>

                <select
                    defaultValue={
                        searchParams.get(
                            'id_departamento'
                        ) || ''
                    }
                    onChange={
                        handleDepartmentChange
                    }
                    className="
                        bg-white
                        w-2/3
                        rounded-xl
                        py-2
                        ps-4
                        border-2
                        border-(--textBaseColor)/50
                        text-(--textBaseColor)
                    "
                >
                    <option value="">
                        Selecione um departamento
                    </option>

                    {departamentos.map(
                        (departamento) => (
                            <option
                                key={
                                    departamento.id_departamento
                                }
                                value={
                                    departamento.id_departamento
                                }
                            >
                                {departamento.nome}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="flex gap-4 items-center flex-1">
                <p className="leading-4.5 text-sm">
                    Busque pelo <br />
                    seu{' '}
                    <span className="text-(--colorVariantBlue) font-bold">
                        líder
                    </span>
                </p>

                <select
                    defaultValue={
                        searchParams.get(
                            'id_lider'
                        ) || ''
                    }
                    onChange={handleLeaderChange}
                    className="
                        bg-white
                        w-2/3
                        rounded-xl
                        py-2
                        ps-4
                        border-2
                        border-(--textBaseColor)/50
                        text-(--textBaseColor)
                    "
                >
                    <option value="">
                        Selecione um líder
                    </option>

                    {lideres.map((lider) => (
                        <option
                            key={lider.id_lider}
                            value={lider.id_lider}
                        >
                            {lider.nome}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}