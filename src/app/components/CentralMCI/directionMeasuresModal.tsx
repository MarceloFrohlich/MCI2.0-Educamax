'use client'

import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";

import { IPrevidenciaForm } from "../../types/centralMCI/centralMCI";

import { VscGraph } from "react-icons/vsc";
import { updatePrevidenciaAction } from "../../actions/jogos/jogos";
import { useServerAction } from "../../hooks/useServerAction";
import FormSubmitButton from "../utils/formSubmitButton";

interface IDirectionMeasuresModalProps {
    measures: IPrevidenciaForm[];

    setMeasures?: React.Dispatch<
        React.SetStateAction<IPrevidenciaForm[]>
    >;

    isEditMode?: boolean;
}

const createEmptyMeasure =
    (): IPrevidenciaForm => ({
        id_previdencia: '',
        verbo: "",
        unidade_medida: "",
        placar_desejado: 0,
        data_inicio: "",
        data_fim: "",
        excluir_periodo: false,
        inativo_de: "",
        inativo_ate: "",
    });

const DirectionMeasuresModal: React.FC<
    IDirectionMeasuresModalProps
> = ({
    measures,
    setMeasures,
    isEditMode = false,
}) => {

        const action = updatePrevidenciaAction
        const {
            state,
            formAction,
            pending
        } = useServerAction(action);

        useEffect(() => {
            if (
                state.success &&
                isEditMode
            ) {
                setOpen(false);

            }

        }, [state, isEditMode]);

        const [
            selectedIndex,
            setSelectedIndex,
        ] = useState<number>(0);

        const [
            formData,
            setFormData,
        ] = useState<IPrevidenciaForm>(
            createEmptyMeasure()
        );

        const [
            open,
            setOpen,
        ] = useState(false);

        const measuresRef = useRef(measures);
        measuresRef.current = measures;

        useEffect(() => {
            if (!open) return;

            const selectedMeasure =
                measuresRef.current[selectedIndex];

            if (selectedMeasure) {
                setFormData(selectedMeasure);
                return;
            }

            setFormData(createEmptyMeasure());

        }, [open, selectedIndex]);

        const handleChange = (
            field: keyof IPrevidenciaForm,
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
            setMeasures((prev) => {
                const updated = [...prev];
                updated[selectedIndex] = {
                    ...formData,
                };
                return updated.filter(Boolean);
            });
            // vai para próxima medida automaticamente
            if (selectedIndex < 2) {
                setSelectedIndex((prev) => prev + 1);
                setFormData(createEmptyMeasure());
            }
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

                <form action={formAction} className="flex flex-col gap-4">

                    <div className="grid grid-cols-3 gap-2 pt-2">

                        {[0, 1, 2].map((index: any) => {

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

                        <input
                            type="hidden"
                            name="previdencias"
                            value={JSON.stringify(measures)}
                        />

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
                                    formData.unidade_medida ?? ""
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "unidade_medida",
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
                                formData.placar_desejado ?? 0
                            }
                            onChange={(e) =>
                                handleChange(
                                    "placar_desejado",
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
                                value={formData.data_inicio ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "data_inicio",
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
                                value={formData.data_fim ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "data_fim",
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
                                formData.excluir_periodo ?? false
                            }
                            onChange={(e) =>
                                handleChange(
                                    "excluir_periodo",
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
                                !formData.excluir_periodo
                            }
                            value={
                                formData.inativo_de ?? ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    "inativo_de",
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
                                !formData.excluir_periodo
                            }
                            value={
                                formData.inativo_ate ?? ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    "inativo_ate",
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


                        {isEditMode && (
                            <FormSubmitButton isEditMode={isEditMode} actionText="Atualizar medida" pending={pending} />
                        )}
                        {!isEditMode && (
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

                                Salvar Medida

                            </Button>

                        )}

                    </div>

                </form>

            </GlobalDialog>

        );

    };

export default DirectionMeasuresModal;