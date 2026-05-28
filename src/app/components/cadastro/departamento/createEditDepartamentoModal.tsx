'use client'

import { CiEdit } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";
import { IDepartamento, IFilial } from "../../../types/cadastros/cadastros";
import { useEffect, useState } from "react";
import { useServerAction } from "../../../hooks/useServerAction";
import { createDepartamentoAction, updateDepartamentoAction } from "../../../actions/cadastros/departamentos";

interface ICreateEditDepartametoModal {
    isEditMode?: boolean;
    departamentoData?: IDepartamento
    filiais: IFilial[]
}

const CreateEditDepartamentoModal: React.FC<ICreateEditDepartametoModal> = ({ isEditMode = false, departamentoData, filiais }) => {
    const [open, setOpen] = useState(false);

    const action = isEditMode
        ? updateDepartamentoAction
        : createDepartamentoAction;

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

    return (
        <GlobalDialog
            open={open}
            onOpenChange={setOpen}
            title={isEditMode ? "Editar Departamento" : "Criar Novo Departamento"}
            contentClassName="w-1/2"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>) : (
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none">
                        Novo Departamento
                    </Button>
                )
            }
        >
            <form action={formAction} className="flex flex-col gap-4">

                {isEditMode && (
                    <input
                        type="hidden"
                        name="id"
                        value={departamentoData?.id_departamento}
                    />
                )}

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Filiais
                        </label>
                        <select
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
                            id="id_filial"
                            name="id_filial"
                            defaultValue={isEditMode ? departamentoData?.id_filial : ""}
                        >
                            <option value=''>Selecione a Filial</option>
                            {filiais && filiais.map(filial => (
                                <option
                                    key={filial.id_filial}
                                    value={filial.id_filial}
                                >{filial.nome}</option>
                            ))}

                        </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">
                            Nome do Departamento
                        </label>
                        <input
                            className="
                            bg-white
                            w-full
                            rounded-xl
                            py-2
                             flex-1
                            ps-4
                            placeholder:text-slate-400
                            focus:outline-none
                            transition-colors
                            border-2
                            border-(--textBaseColor)/50
                            text-(--textBaseColor)
                        "
                            type='text'
                            id="departamento"
                            name="departamento"
                            placeholder="Novo Departamento"
                            defaultValue={isEditMode ? departamentoData?.nome : ""}
                        />
                    </div>
                </div>


                <div className="flex justify-end">
                    <Button
                        disabled={pending}
                        className="
                            hover:cursor-pointer
                            bg-(--colorVariantBlue)
                            text-white
                            hover:bg-(--colorVariantBlue)/80
                            duration-300
                            border-none
                            mt-4
                        "
                        type="submit"
                    >
                        {pending
                            ? "Salvando..."
                            : isEditMode
                                ? "Salvar Alterações"
                                : "Criar Departamento"
                        }
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    )
}

export default CreateEditDepartamentoModal;