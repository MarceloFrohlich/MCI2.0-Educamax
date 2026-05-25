'use client'

import { CiEdit } from "react-icons/ci";

import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";

import { ICup, ILeader } from "../../types/centralMCI/centralMCI";
import { departments } from "../../mocks/mocks";
import Select from "react-select";

interface ICreateEditCupModalProps {
    isEditMode?: boolean;
    cupData?: ICup;
    leaders?: ILeader[];
}

interface ISelectOption {
  value: string;
  label: string;
}

const CreateEditCupModal: React.FC<ICreateEditCupModalProps> = ({
    isEditMode = false,
    cupData,
    leaders = [],
}) => {

    const departmentOptions: ISelectOption[] = departments.map((department) => ({
        value: department.nome,
        label: department.nome,
    }));

    return (
        <GlobalDialog
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
            <form className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="cupName"
                            className="text-sm font-medium text-gray-700"
                        >
                            Nome da Copa
                        </label>

                        <input
                            id="cupName"
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
                            defaultValue={cupData?.lider?.id ?? ""}
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
                        options={departmentOptions}
                        defaultValue={
                            cupData?.departamentos?.map((department) => ({
                                value: department,
                                label: department,
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
                            type="number"
                            placeholder="0"
                            defaultValue={cupData?.para ?? ""}
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
                    </div>
                </div>

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
                            : "Criar Copa"}
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    );
};

export default CreateEditCupModal;