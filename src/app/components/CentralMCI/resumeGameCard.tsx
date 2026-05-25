'use client'

import React, { useState } from 'react';
import { IoFootballOutline } from 'react-icons/io5';
import { FiTarget } from 'react-icons/fi';
import { PiChartBar, } from 'react-icons/pi';
import { IGame } from '../../types/centralMCI/centralMCI';
import Select from 'react-select';
import { cups } from '../../mocks/mocks';

interface IResumeGameCardProps {
    game: IGame
}

const ResumeGameCard: React.FC<
    IResumeGameCardProps
> = ({ game }) => {

    const [selectedCopas, setSelectedCopas] = useState<
        { value: string | number; label: string }[]
    >([]);

    const SELECT_ALL_OPTION = {
        value: 'all',
        label: 'Selecionar todas',
    };

    const copaOptions = [
        SELECT_ALL_OPTION,

        ...cups.map((copa) => ({
            value: copa.id,
            label: copa.nome,
        })),
    ];

    return (
        <div
            className="
                    bg-[#ECECEC]
                    rounded-3xl
                    p-5
                    border
                    border-[#E4E4E4]
                    shadow-sm
                    flex
                    flex-col
                    gap-5
                    overflow-y-auto
                    h-[80vh]
                "
        >

            <div className="flex flex-col gap-3">

                <label
                    className="
            text-sm
            font-semibold
            text-[#5D78B7]
        "
                >
                    Selecione as copas para duplicar
                </label>

                <Select
                    isMulti
                    name="copas"
                    options={copaOptions}
                    value={selectedCopas}
                    placeholder="Selecione as copas"
                    onChange={(selectedOptions) => {

                        const hasSelectAll =
                            selectedOptions?.some(
                                (option) =>
                                    option.value === 'all'
                            );

                        if (hasSelectAll) {

                            setSelectedCopas(
                                cups.map((copa) => ({
                                    value: copa.id,
                                    label: copa.nome,
                                }))
                            );

                            return;
                        }

                        setSelectedCopas(
                            selectedOptions as {
                                value: string | number;
                                label: string;
                            }[]
                        );

                    }}
                    className="text-(--textBaseColor)"
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            backgroundColor: "#F5F5F5",
                            borderRadius: "1rem",
                            border: state.isFocused
                                ? "2px solid #5D78B7"
                                : "2px solid #D9D9D9",
                            minHeight: "52px",
                            boxShadow: "none",
                            paddingLeft: "0.25rem",
                            transition: "all .2s ease",

                            "&:hover": {
                                border: "2px solid #5D78B7",
                            },
                        }),
                    }}
                />

            </div>

            <div
                className="
                        bg-[#F5F5F5]
                        rounded-2xl
                        border-l-4
                        border-[#5D78B7]
                        p-6
                        flex
                        flex-col
                        gap-6
                    "
            >
                <div
                    className="
                            flex
                            items-start
                            justify-between
                            gap-4
                        "
                >
                    <div
                        className="
                                flex
                                items-start
                                gap-4
                            "
                    >
                        <div
                            className="
                                    mt-1
                                    text-[#5D78B7]
                                "
                        >
                            <IoFootballOutline className="size-7" />
                        </div>

                        <div className="flex flex-col">

                            <h2
                                className="
                                        text-xl
                                        font-bold
                                        text-[#17233C]
                                    "
                            >
                                {game.nome}
                            </h2>

                            <span
                                className="
                                        text-md
                                        text-[#6F6F6F]
                                        font-medium
                                    "
                            >
                                {game.lider?.nome}
                                {' • '}
                                {game.departamentos.map((d) => d.nome).join(', ')}
                            </span>

                        </div>

                    </div>

                    <div
                        className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-[#E7E7E7]
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-[#68707A]
                            "
                    >

                        <FiTarget className="size-4" />

                        <span>
                            PLP:
                            {' '}
                            {game.incluirPLP
                                ? 'Sim'
                                : 'Não'}
                        </span>

                    </div>

                </div>

                <div
                    className="
                            grid
                            grid-cols-4
                            gap-6
                            border-b
                            border-[#D9D9D9]
                            pb-6
                        "
                >

                    <div className="flex flex-col gap-1">

                        <span
                            className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    text-[#969696]
                                "
                        >
                            Verbo
                        </span>

                        <span
                            className="
                                    text-md
                                    font-bold
                                    text-[#17233C]
                                "
                        >
                            {game.verbo}
                        </span>

                    </div>

                    <div className="flex flex-col gap-1">

                        <span
                            className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    text-[#969696]
                                "
                        >
                            Medida
                        </span>

                        <span
                            className="
                                    text-md
                                    font-bold
                                    text-[#17233C]
                                "
                        >
                            {game.medida}
                        </span>

                    </div>

                    <div className="flex flex-col gap-1">

                        <span
                            className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    text-[#969696]
                                "
                        >
                            De
                        </span>

                        <span
                            className="
                                    text-md
                                    font-bold
                                    text-[#17233C]
                                "
                        >
                            {game.de}
                        </span>

                    </div>

                    <div className="flex flex-col gap-1">

                        <span
                            className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    text-[#969696]
                                "
                        >
                            Para
                        </span>

                        <span
                            className="
                                    text-md
                                    font-bold
                                    text-[#17233C]
                                "
                        >
                            {game.para}
                        </span>

                    </div>

                </div>

                <div
                    className="
                            grid
                            grid-cols-2
                            gap-6
                        "
                >

                    <div className="flex flex-col gap-1">

                        <span
                            className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    text-[#969696]
                                "
                        >
                            Data Inicial
                        </span>

                        <span
                            className="
                                    text-md
                                    font-bold
                                    text-[#17233C]
                                "
                        >
                            {game.inicio}
                        </span>

                    </div>

                    <div className="flex flex-col gap-1">

                        <span
                            className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    text-[#969696]
                                "
                        >
                            Data Final
                        </span>

                        <span
                            className="
                                    text-md
                                    font-bold
                                    text-[#17233C]
                                "
                        >
                            {game.fim}
                        </span>

                    </div>

                </div>

            </div>

            {game.medidasDirecao.length > 0 && (

                <div
                    className="
                            bg-[#F5F5F5]
                            rounded-2xl
                            border-l-4
                            border-[#2FA84F]
                            p-6
                            flex
                            flex-col
                            gap-5
                        "
                >

                    <div
                        className="
                                flex
                                items-center
                                gap-3
                            "
                    >

                        <PiChartBar
                            className="
                                    size-6
                                    text-[#2FA84F]
                                "
                        />

                        <h3
                            className="
                                    text-md
                                    font-bold
                                    text-[#17233C]
                                "
                        >
                            Medidas
                            {' '}
                            ({game.medidasDirecao.length})
                        </h3>

                    </div>

                    <div className="flex flex-col gap-4">

                        {game.medidasDirecao.map(
                            (measure) => (

                                <div
                                    key={measure.id}
                                    className="
                                            bg-[#ECECEC]
                                            rounded-2xl
                                            border-l-4
                                            border-[#2FA84F]
                                            p-5
                                            flex
                                            flex-col
                                            gap-5
                                        "
                                >

                                    <div
                                        className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                    >

                                        <div className="flex flex-col gap-2">

                                            <h4
                                                className="
                                                        text-md
                                                        font-bold
                                                        text-[#17233C]
                                                    "
                                            >
                                                {measure.verbo.toUpperCase()}
                                                {' '}
                                                {measure.placarDesejado}
                                                {' '}
                                                {measure.unidadeMedida.toUpperCase()}
                                            </h4>

                                            <span
                                                className="
                                                        text-md
                                                        text-[#5D78B7]
                                                        font-medium
                                                    "
                                            >
                                                Verbo:
                                                {' '}
                                                {measure.verbo}
                                            </span>

                                        </div>

                                        <div
                                            className="
                                                    bg-[#F3E5B8]
                                                    text-[#9B6B00]
                                                    font-bold
                                                    rounded-full
                                                    px-4
                                                    py-2
                                                    text-sm
                                                "
                                        >
                                            100%
                                        </div>

                                    </div>

                                    <div
                                        className="
                                                grid
                                                grid-cols-2
                                                gap-y-6
                                                gap-x-10
                                                border-b
                                                border-[#D7D7D7]
                                                pb-5
                                            "
                                    >

                                        <div className="flex flex-col gap-1">

                                            <span
                                                className="
                                                        text-sm
                                                        text-[#969696]
                                                        font-semibold
                                                    "
                                            >
                                                Placar Inicial
                                            </span>

                                            <span
                                                className="
                                                        text-md
                                                        font-bold
                                                        text-[#17233C]
                                                    "
                                            >
                                                0
                                            </span>

                                        </div>

                                        <div className="flex flex-col gap-1">

                                            <span
                                                className="
                                                        text-sm
                                                        text-[#969696]
                                                        font-semibold
                                                    "
                                            >
                                                Placar Desejado
                                            </span>

                                            <span
                                                className="
                                                        text-md
                                                        font-bold
                                                        text-[#5D78B7]
                                                    "
                                            >
                                                {measure.placarDesejado}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="flex flex-col gap-3">

                                        <div className="flex flex-col gap-1">

                                            <span
                                                className="
                                                        text-sm
                                                        text-[#969696]
                                                        font-semibold
                                                    "
                                            >
                                                Período de Atividade
                                            </span>

                                            <span
                                                className="
                                                        text-sm
                                                        font-bold
                                                        text-[#17233C]
                                                    "
                                            >
                                                {measure.dataInicial}
                                                {' até '}
                                                {measure.dataFinal}
                                            </span>

                                        </div>

                                        {measure.excluirPeriodo && (

                                            <div
                                                className="
                                                        bg-[#F3E5B8]
                                                        rounded-xl
                                                        px-4
                                                        py-4
                                                        flex
                                                        flex-col
                                                        gap-1
                                                    "
                                            >

                                                <span
                                                    className="
                                                            text-sm
                                                            font-bold
                                                            text-[#9B6B00]
                                                        "
                                                >
                                                    Período de Inatividade
                                                </span>

                                                <span
                                                    className="
                                                            text-sm
                                                            font-semibold
                                                            text-[#9B6B00]
                                                        "
                                                >
                                                    {
                                                        measure.dataInicialPeriodoExcluido
                                                    }
                                                    {' até '}
                                                    {
                                                        measure.dataFinalPeriodoExcluido
                                                    }
                                                </span>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}

        </div>

    );

};

export default ResumeGameCard;