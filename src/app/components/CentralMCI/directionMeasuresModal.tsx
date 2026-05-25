'use client'

import React, {
    useEffect,
    useState,
} from "react";

import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";

import { IDirectionMeasure } from "../../types/centralMCI/centralMCI";

import { VscGraph } from "react-icons/vsc";

interface IDirectionMeasuresModalProps {
    measures: IDirectionMeasure[];

    setMeasures?: React.Dispatch<
        React.SetStateAction<IDirectionMeasure[]>
    >;

    isEditMode?: boolean;
}

const createEmptyMeasure =
    (): IDirectionMeasure => ({

        id: Date.now(),

        verbo: "",

        unidadeMedida: "",

        placarDesejado: 0,

        dataInicial: "",

        dataFinal: "",

        excluirPeriodo: false,

        dataInicialPeriodoExcluido: "",

        dataFinalPeriodoExcluido: "",

    });

const DirectionMeasuresModal: React.FC<
    IDirectionMeasuresModalProps
> = ({
    measures,
    setMeasures,
    isEditMode = false,
}) => {

    const [
        selectedIndex,
        setSelectedIndex,
    ] = useState<number>(0);

    const [
        formData,
        setFormData,
    ] = useState<IDirectionMeasure>(
        createEmptyMeasure()
    );

    const [
        open,
        setOpen,
    ] = useState(false);

    useEffect(() => {

        const selectedMeasure =
            measures[selectedIndex];

        if (selectedMeasure) {

            setFormData({

                ...createEmptyMeasure(),

                ...selectedMeasure,

            });

            return;

        }

        setFormData(
            createEmptyMeasure()
        );

    }, [
        selectedIndex,
        measures,
    ]);

    const handleChange = (
        field: keyof IDirectionMeasure,
        value: string | number | boolean
    ) => {

        setFormData((prev) => ({

            ...prev,

            [field]: value,

        }));

    };

    const resetState = () => {

        setSelectedIndex(0);

        setFormData(
            createEmptyMeasure()
        );

    };

    const handleSaveMeasure = () => {

        if (!setMeasures) {
            return;
        }

        const updatedMeasures = [
            ...measures,
        ];

        updatedMeasures[selectedIndex] =
            formData;

        setMeasures(
            updatedMeasures.filter(Boolean)
        );

    };

    return (

        <GlobalDialog
            open={open}
            onOpenChange={(isOpen) => {

                setOpen(isOpen);

                if (!isOpen) {

                    resetState();

                }

            }}
            title={
                isEditMode
                    ? "Editar Medidas"
                    : "Medidas de Direção"
            }
            contentClassName="sm:max-w-2xl"
            trigger={

                isEditMode ? (

                    <Button
                        type="button"
                        className="
                            bg-transparent
                            hover:bg-transparent
                            shadow-none
                            p-0
                            hover:cursor-pointer
                        "
                    >

                        <VscGraph className="text-(--textBaseColor) size-5" />

                    </Button>

                ) : (

                    <Button
                        type="button"
                        className="
                            bg-background
                            text-(--colorVariantBlue)
                            border-2
                            border-(--colorVariantBlue)/70
                            hover:border-(--colorVariantBlue)
                            duration-300
                            hover:cursor-pointer
                            h-14
                            w-full
                        "
                    >
                        + Incluir medidas de direção
                    </Button>

                )

            }
        >

            <div className="flex flex-col gap-4">

                <div className="grid grid-cols-3 gap-2 pt-2">

                    {[0, 1, 2].map((index) => {

                        const currentMeasure =
                            measures[index];

                        return (

                            <Button
                                key={index}
                                type="button"
                                variant={
                                    selectedIndex === index
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => {

                                    setSelectedIndex(index);

                                    if (!currentMeasure) {

                                        setFormData(
                                            createEmptyMeasure()
                                        );

                                        return;

                                    }

                                    setFormData({

                                        ...createEmptyMeasure(),

                                        ...currentMeasure,

                                    });

                                }}
                                className="
                                    truncate
                                    hover:cursor-pointer
                                "
                            >

                                {currentMeasure?.verbo ||
                                    `Criar Medida ${index + 1}`}

                            </Button>

                        );

                    })}

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Verbo
                        </label>

                        <input
                            type="text"
                            value={formData.verbo ?? ""}
                            onChange={(e) =>
                                handleChange(
                                    "verbo",
                                    e.target.value
                                )
                            }
                            placeholder="Ex: Evangelizar"
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                                focus:outline-none
                            "
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Unidade de Medida
                        </label>

                        <input
                            type="text"
                            value={
                                formData.unidadeMedida ?? ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    "unidadeMedida",
                                    e.target.value
                                )
                            }
                            placeholder="Ex: Pessoas"
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                                focus:outline-none
                            "
                        />

                    </div>

                </div>

                <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-gray-700">
                        Placar Desejado
                    </label>

                    <input
                        type="number"
                        value={
                            formData.placarDesejado ?? 0
                        }
                        onChange={(e) =>
                            handleChange(
                                "placarDesejado",
                                Number(e.target.value)
                            )
                        }
                        placeholder="0"
                        className="
                            bg-white
                            w-full
                            rounded-xl
                            py-2
                            px-4
                            border-2
                            border-(--textBaseColor)/50
                            focus:outline-none
                        "
                    />

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Data Inicial
                        </label>

                        <input
                            type="date"
                            value={formData.dataInicial ?? ""}
                            onChange={(e) =>
                                handleChange(
                                    "dataInicial",
                                    e.target.value
                                )
                            }
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                                focus:outline-none
                            "
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Data Final
                        </label>

                        <input
                            type="date"
                            value={formData.dataFinal ?? ""}
                            onChange={(e) =>
                                handleChange(
                                    "dataFinal",
                                    e.target.value
                                )
                            }
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                                focus:outline-none
                            "
                        />

                    </div>

                </div>

                <div className="flex items-center gap-2">

                    <input
                        type="checkbox"
                        checked={
                            formData.excluirPeriodo ?? false
                        }
                        onChange={(e) =>
                            handleChange(
                                "excluirPeriodo",
                                e.target.checked
                            )
                        }
                        className="size-5"
                    />

                    <label className="text-sm font-medium text-gray-700">
                        Excluir período
                    </label>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <input
                        type="date"
                        disabled={
                            !formData.excluirPeriodo
                        }
                        value={
                            formData.dataInicialPeriodoExcluido ?? ""
                        }
                        onChange={(e) =>
                            handleChange(
                                "dataInicialPeriodoExcluido",
                                e.target.value
                            )
                        }
                        className="
                            bg-white
                            w-full
                            rounded-xl
                            py-2
                            px-4
                            border-2
                            border-(--textBaseColor)/50
                            focus:outline-none
                            disabled:opacity-50
                        "
                    />

                    <input
                        type="date"
                        disabled={
                            !formData.excluirPeriodo
                        }
                        value={
                            formData.dataFinalPeriodoExcluido ?? ""
                        }
                        onChange={(e) =>
                            handleChange(
                                "dataFinalPeriodoExcluido",
                                e.target.value
                            )
                        }
                        className="
                            bg-white
                            w-full
                            rounded-xl
                            py-2
                            px-4
                            border-2
                            border-(--textBaseColor)/50
                            focus:outline-none
                            disabled:opacity-50
                        "
                    />

                </div>

                <div className="flex justify-end">

                    <Button
                        type="button"
                        onClick={handleSaveMeasure}
                        className="
                            bg-(--colorVariantBlue)
                            text-white
                            hover:bg-(--colorVariantBlue)/80
                            hover:cursor-pointer
                        "
                    >

                        {isEditMode
                            ? "Salvar Alterações"
                            : "Salvar Medida"}

                    </Button>

                </div>

            </div>

        </GlobalDialog>

    );

};

export default DirectionMeasuresModal;