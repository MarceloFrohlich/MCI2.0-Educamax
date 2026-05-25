'use client'

import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { IDirectionMeasure } from "../../types/centralMCI/centralMCI";
import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";

import { IGame, ILeader } from "../../types/centralMCI/centralMCI";
import { departments } from "../../mocks/mocks";
import Select from "react-select";
import TriggerButton from "../utils/triggerButton";
import { PiVolleyball } from "react-icons/pi";
import DirectionMeasuresModal from "./directionMeasuresModal";


interface ICreateEditGameModalProps {
    isEditMode?: boolean;
    gameData?: IGame;
    leaders?: ILeader[];
}

interface ISelectOption {
    value: string;
    label: string;
}

const CreateEditGameModal: React.FC<ICreateEditGameModalProps> = ({
    isEditMode = false,
    gameData,
    leaders = [],
}) => {

    const [directionMeasures, setDirectionMeasures] = useState<IDirectionMeasure[]>(
        gameData?.medidasDirecao ?? []
    );

    const [open, setOpen] = useState(false);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setDirectionMeasures([]);
        }

    };

    const handleAddDirectionMeasure = (
        measure: IDirectionMeasure
    ) => {

        if (directionMeasures.length >= 3) {
            return;
        }

        setDirectionMeasures((prev) => [
            ...prev,
            measure,
        ]);
    };

    const departmentOptions: ISelectOption[] =
        departments.map((department) => ({
            value: String(department.id),
            label: department.nome,
        }));

    const handleSubmit = (formData: FormData) => {
        const payload = {
            nome: formData.get("gameName"),
            liderId: formData.get("leader"),
            departamentos: formData
                .getAll("departamentos")
                .map(Number),
            verbo: formData.get("verbo"),
            medida: formData.get("medida"),
            de: Number(formData.get("de")),
            para: Number(formData.get("para")),
            inicio: formData.get("inicio"),
            fim: formData.get("fim"),
            observacoes: formData.get("observacoes"),
            incluirPLP: formData.get("plp") === "on",
            medidasDirecao: directionMeasures.map(
                (measure) => ({
                    id: measure.id,
                    verbo: measure.verbo,
                    unidadeMedida: measure.unidadeMedida,
                    placarDesejado: measure.placarDesejado,
                    dataInicial: measure.dataInicial,
                    dataFinal: measure.dataFinal,
                    excluirPeriodo: measure.excluirPeriodo,

                    dataInicialPeriodoExcluido:
                        measure.dataInicialPeriodoExcluido,

                    dataFinalPeriodoExcluido:
                        measure.dataFinalPeriodoExcluido,
                })
            ),
        };

        console.log(payload);

    };

    return (
        <GlobalDialog
            open={open}
            onOpenChange={handleOpenChange}
            title={isEditMode ? "Editar Jogo" : "Criar Novo Jogo"}
            contentClassName="sm:max-w-2xl"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-(--textBaseColor) size-6" />
                    </Button>
                ) : (
                    <TriggerButton children={<PiVolleyball className="size-5 pointer-events-none" />} />
                )
            }
        >
            <form action={handleSubmit} className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="gameName"
                            className="text-sm font-medium text-gray-700"
                        >
                            Nome do Jogo
                        </label>

                        <input
                            id="gameName"
                            name="gameName"
                            type="text"
                            placeholder="Nome do jogo"
                            defaultValue={gameData?.nome ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                ps-4
                                placeholder:text-slate-400
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="leader"
                            className="text-sm font-medium text-gray-700"
                        >
                            Líder
                        </label>

                        <select
                            id="leader"
                            name="leader"
                            defaultValue={gameData?.lider?.id ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                px-4
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        >
                            <option value="">
                                Selecione um líder
                            </option>

                            {leaders.map((leader) => (
                                <option
                                    key={leader.id}
                                    value={leader.id}
                                >
                                    {leader.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="departamentos"
                        className="text-sm font-medium text-gray-700"
                    >
                        Departamentos
                    </label>

                    <Select
                        isMulti
                        isDisabled={isEditMode}
                        name="departamentos"
                        options={departmentOptions}
                        defaultValue={
                            gameData?.departamentos?.map((department) => ({
                                value: String(department.id),
                                label: department.nome,
                            })) ?? []
                        }
                        placeholder="Selecione os departamentos"
                        className="text-(--textBaseColor)"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                backgroundColor: "#fff",
                                borderRadius: "0.75rem",
                                border: "2px solid rgba(17, 44, 70, 0.5)",
                                minHeight: "44px",
                                boxShadow: "none",
                                paddingLeft: "0.25rem",
                                transition: "all .2s ease",
                                cursor: "pointer",

                                "&:hover": {
                                    border: "2px solid rgba(17, 44, 70, 0.7)",
                                },
                            }),

                            placeholder: (base) => ({
                                ...base,
                                color: "#94a3b8",
                            }),

                            multiValue: (base) => ({
                                ...base,
                                backgroundColor: "rgba(52, 119, 221, 0.12)",
                                borderRadius: "0.5rem",
                            }),

                            multiValueLabel: (base) => ({
                                ...base,
                                color: "#112C46",
                                fontWeight: 500,
                            }),

                            multiValueRemove: (base) => ({
                                ...base,
                                color: "#112C46",
                                cursor: "pointer",

                                ":hover": {
                                    backgroundColor: "rgba(52, 119, 221, 0.2)",
                                    color: "#112C46",
                                },
                            }),

                            menu: (base) => ({
                                ...base,
                                borderRadius: "0.75rem",
                                overflow: "hidden",
                                zIndex: 9999,
                            }),

                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                    ? "rgba(52, 119, 221, 0.1)"
                                    : "#fff",
                                color: "#112C46",
                                cursor: "pointer",
                            }),
                        }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="verbo"
                            className="text-sm font-medium text-gray-700"
                        >
                            Verbo
                        </label>

                        <input
                            id="verbo"
                            type="text"
                            name="verbo"
                            placeholder="Ex: Evangelizar"
                            defaultValue={gameData?.verbo ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                ps-4
                                placeholder:text-slate-400
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="medida"
                            className="text-sm font-medium text-gray-700"
                        >
                            Medida
                        </label>

                        <input
                            id="medida"
                            type="text"
                            name="medida"
                            placeholder="Ex: Pessoas"
                            defaultValue={gameData?.medida ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                ps-4
                                placeholder:text-slate-400
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="de"
                            className="text-sm font-medium text-gray-700"
                        >
                            De
                        </label>

                        <input
                            id="de"
                            name="de"
                            type="number"
                            placeholder="0"
                            defaultValue={gameData?.de ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                ps-4
                                placeholder:text-slate-400
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="para"
                            className="text-sm font-medium text-gray-700"
                        >
                            Para
                        </label>

                        <input
                            id="para"
                            name="para"
                            type="number"
                            placeholder="0"
                            defaultValue={gameData?.para ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                ps-4
                                placeholder:text-slate-400
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="inicio"
                            className="text-sm font-medium text-gray-700"
                        >
                            Data Inicial
                        </label>

                        <input
                            id="inicio"
                            name="inicio"
                            type="date"
                            defaultValue={gameData?.inicio ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                px-4
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="fim"
                            className="text-sm font-medium text-gray-700"
                        >
                            Data Final
                        </label>

                        <input
                            id="fim"
                            name="fim"
                            type="date"
                            defaultValue={gameData?.fim ?? ""}
                            className="
                                bg-white
                                w-full
                                rounded-xl
                                py-2
                                px-4
                                focus:outline-none
                                transition-colors
                                border-2
                                border-(--textBaseColor)/50
                                text-(--textBaseColor)
                            "
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="observacoes"
                        className="text-sm font-medium text-gray-700"
                    >
                        Observações
                    </label>

                    <textarea
                        id="observacoes"
                        name="observacoes"
                        defaultValue={gameData?.observacoes ?? ""}
                        placeholder="Observações adicionais sobre o jogo"
                        className="
                            bg-white
                            w-full
                            rounded-xl
                            py-2
                            px-4
                            focus:outline-none
                            transition-colors
                            border-2
                            border-(--textBaseColor)/50
                            text-(--textBaseColor)
                        "
                    />
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" defaultChecked={gameData?.incluirPLP} className="size-5" id="plp" />
                    <label
                        htmlFor="plp"
                        className="text-sm font-medium text-gray-700"
                    >
                        Incluir PLP
                    </label>
                </div>

                {!isEditMode && (
                    <div className="flex flex-col gap-3">

                        <div className="flex items-center justify-between">

                            <DirectionMeasuresModal
                                measures={directionMeasures}
                                setMeasures={setDirectionMeasures}
                            />

                        </div>

                        {directionMeasures.length > 0 && (

                            <div className="grid grid-cols-3 gap-2">

                                {directionMeasures.map((measure) => (

                                    <div
                                        key={measure.id}
                                        className="
                                        border
                                        rounded-xl
                                        p-3
                                        flex
                                        flex-col
                                        gap-1
                                    "
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">
                                                {measure.verbo}
                                            </span>
                                            <span className="text-sm text-slate-600">
                                                {measure.unidadeMedida}
                                            </span>
                                        </div>

                                        <span className="text-sm">
                                            Meta:
                                            {" "}
                                            {measure.placarDesejado}
                                        </span>

                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">
                                                {measure.dataInicial}
                                            </span>
                                            <span className="text-sm text-slate-600">
                                                {measure.dataFinal}
                                            </span>
                                        </div>

                                        {measure.excluirPeriodo && (

                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">
                                                    {measure.dataInicialPeriodoExcluido}
                                                </span>
                                                <span className="text-sm text-slate-600">
                                                    {measure.dataFinalPeriodoExcluido}
                                                </span>
                                            </div>
                                        )}

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>
                )}

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="
                            hover:cursor-pointer
                            bg-(--colorVariantBlue)
                            text-white
                            hover:bg-(--colorVariantBlue)/80
                            duration-300
                            border-none
                            mt-4
                        "
                    >
                        {isEditMode
                            ? "Salvar Alterações"
                            : "Criar Jogo"}
                    </Button>
                </div>

            </form>
        </GlobalDialog>
    );
};

export default CreateEditGameModal;