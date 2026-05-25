'use client'

import React from "react";
import { Trash2 } from "lucide-react";

import { Button } from "../../../components/ui/button";
import GlobalDialog from "./globalDialog";
import { DialogClose } from "../../../components/ui/dialog";

interface IDeleteModalProps {
    title?: string;
    description?: string;
    trigger?: React.ReactNode;
    contentClassName?: string;

    onConfirm: () => void | Promise<void>;
    isLoading?: boolean;

    confirmText?: string;
    cancelText?: string;
}

const DeleteModal: React.FC<IDeleteModalProps> = ({
    title = "Confirmar exclusão",
    description = "Tem certeza que deseja excluir este item? Essa ação não poderá ser desfeita.",
    trigger,
    contentClassName,
    onConfirm,
    isLoading = false,
    confirmText = "Excluir",
    cancelText = "Cancelar",
}) => {
    return (
        <GlobalDialog
            title={title}
            contentClassName={contentClassName ?? "sm:max-w-md"}
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
            <div className="mt-2">
                <p className="text-sm text-slate-600">
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button
                            className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none"
                        >
                            {cancelText}
                        </Button>
                    </DialogClose>

                    <Button
                        type="button"
                        disabled={isLoading}
                        onClick={onConfirm}
                        className="
              bg-red-600
              text-white
              hover:bg-red-700
              hover:cursor-pointer
            "
                    >
                        {isLoading ? "Excluindo..." : confirmText}
                    </Button>
                </div>
            </div>
        </GlobalDialog>
    );
};

export default DeleteModal;