'use client'

import React, { useEffect, useState } from 'react';
import { IoFootballOutline } from 'react-icons/io5';
import { FiTarget } from 'react-icons/fi';
import { PiChartBar, } from 'react-icons/pi';
import { ICup, IGame } from '../../types/centralMCI/centralMCI';
import Select from 'react-select';
import { formatDateBR } from '../utils/general';
import { replicarJogoAction } from '../../actions/jogos/jogos';
import { useServerAction } from '../../hooks/useServerAction';
import FormSubmitButton from '../utils/formSubmitButton';

interface IResumeGameCardProps {
    game: IGame
    copas: ICup[]
    open: boolean
    setOpen: (open: boolean) => void
}

const ResumeGameCard: React.FC<
    IResumeGameCardProps
> = ({ game, copas, setOpen }) => {

        const action = replicarJogoAction
    
        const {
            state,
            formAction,
            pending
        } = useServerAction(action);
    
        useEffect(() => {
            if (!state.success) return;

            if (state.success === true && state.successMessage) {
                setOpen(false);
            }
    
        }, [state]);

    const [selectedCopas, setSelectedCopas] = useState<
        { value: string | number; label: string }[]
    >([]);

    const SELECT_ALL_OPTION = {
        value: 'all',
        label: 'Selecionar todas',
    };

    const availableCopas = (copas ?? []).filter(
        (copa) => copa.id_copa !== game.copa.id_copa
    );

    const copaOptions = [
        ...(availableCopas.length > 0 ? [SELECT_ALL_OPTION] : []),

        ...availableCopas.map((copa) => ({
            value: copa.id_copa,
            label: `${copa.departamento.nome} - ${copa.nome}`,
        })),
    ];

    return (
        <form action={formAction}
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
            <input
                type="hidden"
                name="id"
                value={game.id_jogo}
            />
            <input
                type="hidden"
                name="selectedCopas"
                value={selectedCopas.map((copa) => copa.value).join(',')}
            />

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
                    noOptionsMessage={() => 'Nenhuma copa para duplicar'}
                    onChange={(selectedOptions) => {

                        const hasSelectAll =
                            selectedOptions?.some(
                                (option) => option.value === 'all'
                            );

                        if (hasSelectAll) {

                            setSelectedCopas(
                                availableCopas.map((copa) => ({
                                    value: copa.id_copa,
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
                                Líder: {game.lider?.nome}
                            </span>
                            <span
                                className="
                                        text-md
                                        text-[#6F6F6F]
                                        font-medium
                                    "
                            >
                                Copa: {game.copa.departamento.nome} - {game.copa.nome}
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
                            {game.tem_plp
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
                            {formatDateBR(game.data_inicio)}
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
                            {formatDateBR(game.data_fim)}
                        </span>

                    </div>

                </div>

            </div>

            {game.previdencias.length > 0 && (

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
                            ({game.previdencias.length})
                        </h3>

                    </div>

                    <div className="flex flex-col gap-4">

                        {game.previdencias.map(
                            (measure) => (

                                <div
                                    key={measure.id_previdencia}
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
                                                {measure.placar_desejado}
                                                {' '}
                                                {`${measure.verbo.toUpperCase()} ${measure.unidade_medida.toUpperCase()}`}
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
                                                {measure.placar_desejado}
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
                                                {formatDateBR(measure.data_inicio)}
                                                {' até '}
                                                {formatDateBR(measure.data_fim)}
                                            </span>

                                        </div>

                                        {measure.excluir_periodo && (

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
                                                        formatDateBR(measure.inativo_de)
                                                    }
                                                    {' até '}
                                                    {
                                                        formatDateBR(measure.inativo_ate)
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

            <div className="flex justify-end mt-5 gap-3">
                <FormSubmitButton actionText='Replicar Jogo' pending={pending} isEditMode={false} />
            </div>
        </form>

    );

};

export default ResumeGameCard;