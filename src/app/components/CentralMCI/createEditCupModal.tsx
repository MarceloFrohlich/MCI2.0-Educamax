'use client'

import { CiEdit } from "react-icons/ci";
import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";
import { ICup } from "../../types/centralMCI/centralMCI";
import Select from "react-select";
import { useEffect, useState } from "react";
import { IDepartamento } from "../../types/cadastros/cadastros";
import FormSubmitButton from "../utils/formSubmitButton";
import { createCopaAction, updateCopaAction } from "../../actions/copas/copas";
import { useServerAction } from "../../hooks/useServerAction";
import { useValidacaoForm } from "../../hooks/useValidacaoForm";
import { copaSchema } from "../../schemas/centralmci";
import ErroCampo from "../utils/erroCampo";

interface ICreateEditCupModalProps {
    isEditMode?: boolean;
    cupData?: ICup;
    departamentos: IDepartamento[]
}

interface ISelectOption {
    value: string;
    label: string;
}

const CreateEditCupModal: React.FC<ICreateEditCupModalProps> = ({
    isEditMode = false,
    cupData,
    departamentos
}) => {

    const [open, setOpen] = useState(false);

    const action = isEditMode
        ? updateCopaAction
        : createCopaAction;

    const {
        state,
        formAction,
        pending
    } = useServerAction(action);

    const { erros, validar } = useValidacaoForm(copaSchema, ['departamentos']);

    useEffect(() => {
        if (
            state.success &&
            isEditMode
        ) {
            setOpen(false);

        }

    }, [state, isEditMode]);

    const [selectedDepartments, setSelectedDepartments] = useState<ISelectOption[]>(
        cupData?.departamento
            ? [
                {
                    value: cupData.departamento.id_departamento,
                    label: cupData.departamento.nome,
                },
            ]
            : []
    );

    const departmentOptions: ISelectOption[] = departamentos.map((department) => ({
        value: department.id_departamento,
        label: department.nome,
    }));

    return (
        <GlobalDialog
            open={open}
            onOpenChange={setOpen}
            title={isEditMode ? "Editar Copa" : "Criar Nova Copa"}
            contentClassName="sm:max-w-2xl"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>
                ) : (
                    <Button
                        className="
                            hover:cursor-pointer
                            bg-(--colorVariantBlue)
                            text-white
                            hover:bg-(--colorVariantBlue)/80
                            duration-300
                            border-none
                        "
                    >
                        Nova Copa
                    </Button>
                )
            }
        >
            <form action={formAction} onSubmit={validar} noValidate className="flex flex-col gap-4">
                {selectedDepartments.map((department) => (
                    <input
                        key={department.value}
                        type="hidden"
                        name="departamentos"
                        value={department.value}
                    />
                ))}

                {isEditMode && (
                    <input
                        key={cupData?.id_copa}
                        type="hidden"
                        name="id"
                        value={cupData?.id_copa}
                    />
                )}

                <div className="flex flex-col gap-2 w-full">
                    <label
                        htmlFor="cupName"
                        className="text-sm font-medium text-gray-700"
                    >
                        Nome da Copa
                    </label>

                    <input
                        id="cupName"
                        name="cupName"
                        type="text"
                        placeholder="Nome da copa"
                        defaultValue={cupData?.nome ?? ""}
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

                    <ErroCampo erro={erros.cupName} />
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
                        onChange={(value) =>
                            setSelectedDepartments(value as ISelectOption[])
                        }
                        options={departmentOptions}
                        defaultValue={
                            cupData?.departamento
                                ? [
                                    {
                                        value: cupData.departamento.id_departamento,
                                        label: cupData.departamento.nome,
                                    },
                                ]
                                : []
                        }
                        placeholder="Selecione os departamentos"
                        className="text-(--textBaseColor)"
                        styles={{
                            control: (base) => ({
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

                    <ErroCampo erro={erros.departamentos} />
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
                            name="verbo"
                            type="text"
                            placeholder="Ex: Evangelizar"
                            defaultValue={cupData?.verbo ?? ""}
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

                        <ErroCampo erro={erros.verbo} />
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
                            name="medida"
                            type="text"
                            placeholder="Ex: Pessoas"
                            defaultValue={cupData?.medida ?? ""}
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

                        <ErroCampo erro={erros.medida} />
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
                            defaultValue={cupData?.de ?? ""}
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

                        <ErroCampo erro={erros.de} />
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
                            defaultValue={cupData?.ate ?? ""}
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

                        <ErroCampo erro={erros.para} />
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
                            id="start_date"
                            name="start_date"
                            type="date"
                            defaultValue={cupData?.inicio ?? ""}
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

                        <ErroCampo erro={erros.start_date} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="fim"
                            className="text-sm font-medium text-gray-700"
                        >
                            Data Final
                        </label>

                        <input
                            id="end_date"
                            name="end_date"
                            type="date"
                            defaultValue={cupData?.fim ?? ""}
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

                        <ErroCampo erro={erros.end_date} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <FormSubmitButton actionText="Salvar Copa" pending={pending} isEditMode={isEditMode} />
                </div>
            </form>
        </GlobalDialog>
    );
};

export default CreateEditCupModal;