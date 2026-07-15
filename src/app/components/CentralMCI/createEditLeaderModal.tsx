'use client'

import { CiEdit } from "react-icons/ci";
import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";
import { ILeader } from "../../types/centralMCI/centralMCI";
import { createLiderAction, updateLiderAction } from "../../actions/lideres/lideres";
import { useServerAction } from "../../hooks/useServerAction";
import { useEffect, useState } from "react";
import FormSubmitButton from "../utils/formSubmitButton";

interface ICreateEditLeaderModalProps {
    isEditMode?: boolean;
    leaderData?: ILeader
}

const CreateEditLeaderModal: React.FC<ICreateEditLeaderModalProps> = ({ isEditMode = false, leaderData }) => {

    const [open, setOpen] = useState(false);
    const action = isEditMode
        ? updateLiderAction
        : createLiderAction;

    const {
        state,
        formAction,
        pending
    } = useServerAction(action);

    useEffect(() => {

        if (
            state.success === true && state.successMessage &&
            isEditMode
        ) {
            setOpen(false);
        }

    }, [state, isEditMode]);


    return (
        <GlobalDialog
            open={open}
            onOpenChange={setOpen}
            title={isEditMode ? "Editar Líder" : "Criar Novo Líder"}
            contentClassName="w-[95%] sm:w-1/2 md:w-1/4"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>) : (
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none">
                        Novo Líder
                    </Button>
                )
            }
        >
            <form action={formAction}>
                <div className="flex flex-col gap-2">

                    {isEditMode && (
                        <input
                            type="hidden"
                            name="id"
                            value={leaderData?.id_lider}
                        />
                    )}

                    <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                        Nome do Líder
                    </label>
                    <input
                        className="
                            peer
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
                        type='text'
                        id="newleader"
                        name="newleader"
                        placeholder="Novo Lider"
                        defaultValue={isEditMode ? leaderData?.nome : ""}
                    />
                </div>

                <div className="flex justify-end">
                   <FormSubmitButton isEditMode={isEditMode} pending={pending} actionText="Criar lider"/>
                </div>
            </form>
        </GlobalDialog>
    )
}

export default CreateEditLeaderModal;