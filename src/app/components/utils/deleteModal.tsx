'use client'

import React, { useActionState, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import GlobalDialog from "./globalDialog";
import { DialogClose } from "../../../components/ui/dialog";

interface IActionResponse {
    success: boolean;
    message: string;
}

interface IDeleteModalProps {
    id: string;
    action: (
        prevState: IActionResponse,
        formData: FormData
    ) => Promise<IActionResponse>;
    title?: string;
    description?: string;
    trigger?: React.ReactNode;
    contentClassName?: string;
    confirmText?: string;
    cancelText?: string;
}

const initialState: IActionResponse = {
    success: false,
    message: "",
};

const DeleteModal: React.FC<IDeleteModalProps> = ({
    id,
    action,
    title = "Confirmar exclusão",
    description = "Tem certeza que deseja excluir este item? Essa ação não poderá ser desfeita.",
    trigger,
    contentClassName,
    confirmText = "Excluir",
    cancelText = "Cancelar",
}) => {

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [state, formAction, pending] =
        useActionState(
            action,
            initialState
        );
useEffect(() => {

    if (state?.success === true) {

        toast.success(state.message);

        setTimeout(() => {
            setOpen(false);
        }, 100);
    }

    if (state?.success === false) {
        toast.error(state.message);
    }

}, [state]);

    useEffect(() => {
    console.log(state);
}, [state]);

    return (
        <GlobalDialog
            open={open}
            onOpenChange={setOpen}
            title={title}
            contentClassName={
                contentClassName ?? "sm:max-w-md"
            }
            trigger={
                trigger ?? (
                    <Button
                        className="
                            h-auto
                            bg-transparent
                            w-auto
                            p-1
                            hover:cursor-pointer
                        "
                    >
                        <Trash2
                            className="text-red-600 size-4"
                        />
                    </Button>
                )
            }
        >

            <form action={formAction}>

                <input
                    type="hidden"
                    name="id"
                    value={id}
                />

                <div className="mt-2">
                    <p className="text-sm text-slate-600">
                        {description}
                    </p>
                    <div className="mt-6 flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="
                                    hover:cursor-pointer
                                    bg-(--colorVariantBlue)
                                    text-white
                                    hover:bg-(--colorVariantBlue)/80
                                    duration-300
                                    border-none
                                "
                            >
                                {cancelText}
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={pending}
                            className="
                                bg-red-600
                                text-white
                                hover:bg-red-700
                                hover:cursor-pointer
                            "
                        >
                            {pending
                                ? "Excluindo..."
                                : confirmText}
                        </Button>

                    </div>

                </div>

            </form>

        </GlobalDialog>
    );
};

export default DeleteModal;