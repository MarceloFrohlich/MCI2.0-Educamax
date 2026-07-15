'use client'

import { CiEdit } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";
import { IFilial, IFranqueadora } from "../../../types/cadastros/cadastros";
import { createFilialAction, updateFilialAction } from "../../../actions/cadastros/filiais";
import { useServerAction } from "../../../hooks/useServerAction";
import { useEffect, useState } from "react";

interface ICreateEditFilialModal {
    isEditMode?: boolean;
    filialData?: IFilial
    franqueadoras: IFranqueadora[]
}

const CreateEditFilialModal: React.FC<ICreateEditFilialModal> = ({ isEditMode = false, filialData, franqueadoras }) => {

    const [open, setOpen] = useState(false);

    const action = isEditMode
        ? updateFilialAction
        : createFilialAction;

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
            title={isEditMode ? "Editar Filial" : "Criar Nova Filial"}
            contentClassName="w-[95%] md:w-1/2"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>) : (
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none">
                        Nova Filial
                    </Button>
                )
            }
        >
            <form action={formAction} className="flex flex-col gap-4">

                {isEditMode && (
                    <input
                        type="hidden"
                        name="id"
                        value={filialData?.id_filial}
                    />
                )}

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Franqueadoras
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
                            name="id_franqueadora"
                            id="id_franqueadora"
                            defaultValue={isEditMode ? filialData?.id_franqueadora : ""}
                        >
                            <option value=''>Selecione a franqueadora</option>
                            {franqueadoras && franqueadoras.map(franqueadora => (
                                <option
                                    key={franqueadora.id_franqueadora}
                                    value={franqueadora.id_franqueadora}
                                >{franqueadora.nome}</option>
                            ))}

                        </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Nome da Filial
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
                            id="filial"
                            name="nome"
                            placeholder="Nova Filial"
                            defaultValue={isEditMode ? filialData?.nome : ""}
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
                                : "Criar Filial"
                        }
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    )
}

export default CreateEditFilialModal;