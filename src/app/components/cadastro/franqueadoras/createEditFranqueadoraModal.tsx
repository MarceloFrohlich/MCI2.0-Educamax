'use client';

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";

import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";


import { IFranqueadora } from "../../../types/cadastros/cadastros";
import { createFranqueadoraAction, updateFranqueadoraAction } from "../../../actions/cadastros/franqueadoras";

interface ICreateEditLeaderModalProps {
    isEditMode?: boolean;
    franqueadoraData?: IFranqueadora
}

const initialState = {
    success: false,
    message: "",
};

const CreateEditFranqueadoraModal: React.FC<ICreateEditLeaderModalProps> = ({
    isEditMode = false,
    franqueadoraData
}) => {

    const action = isEditMode
        ? updateFranqueadoraAction
        : createFranqueadoraAction;

    const [state, formAction, pending] = useActionState(
        action,
        initialState
    );

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
        }

        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <GlobalDialog
            title={
                isEditMode
                    ? "Editar Franqueadora"
                    : "Criar Nova Franqueadora"
            }
            contentClassName="w-1/4"
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
                        Nova Franqueadora
                    </Button>
                )
            }
        >
            <form
                action={formAction}
                className="flex flex-col gap-4"
            >

                {isEditMode && (
                    <input
                        type="hidden"
                        name="id"
                        value={franqueadoraData?.id}
                    />
                )}

                <div className="flex flex-col gap-2 w-full">
                    <label
                        htmlFor="nome"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nome da franqueadora
                    </label>

                    <input
                        name="nome"
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
                        type="text"
                        id="nome"
                        placeholder="Nova Franqueadora"
                        defaultValue={
                            isEditMode
                                ? franqueadoraData?.nome
                                : ""
                        }
                    />
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
                                : "Criar Franqueadora"
                        }
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    );
}

export default CreateEditFranqueadoraModal;