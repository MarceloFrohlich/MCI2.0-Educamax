'use client'

import { useEffect, useState } from "react"
import GlobalDialog from "../utils/globalDialog"
import { Button } from "../../../components/ui/button"
import { IRelatorio } from "../../types/relatorios/relatorios"
import { avaliarMciAction } from "../../actions/relatorios/relatorios"
import { useServerAction } from "../../hooks/useServerAction"
import FormSubmitButton from "../utils/formSubmitButton"

interface IAvaliacaoModalProps {
    report: IRelatorio
    onSaved?: () => void
}

const AvaliacaoModal: React.FC<IAvaliacaoModalProps> = ({ report, onSaved }) => {

    const [open, setOpen] = useState(false);

    const action = avaliarMciAction

    const {
        state,
        formAction,
        pending
    } = useServerAction(action);

    useEffect(() => {
        if (state.success === true && state.successMessage) {
            setOpen(false);
            onSaved?.();
        }
    }, [state]);

    return (
        <GlobalDialog
            title="Atualização de resultado."
            open={open}
            onOpenChange={setOpen}
            contentClassName="w-[33%]"
            trigger={
                <Button
                    className="
                        hover:cursor-pointer
                        bg-(--colorVariantBlue)
                        text-white
                        hover:bg-(--colorVariantBlue)/80
                        duration-300
                        border-none
                        rounded-full
                        h-8
                        px-4
                        text-xs
                    "
                >
                    {report.status ? 'Editar avaliação' : 'Adicionar avaliação'}
                </Button>
            }
        >
            <form action={formAction} className="flex flex-col gap-4">

                <input
                    type="hidden"
                    name="id_jogo"
                    value={report.id_jogo}
                />

                <div className="flex flex-col gap-2">
                    <label htmlFor="valor" className="text-sm font-medium text-gray-700">
                        Qual o valor desse MCI?
                    </label>

                    <input
                        id="valor"
                        name="valor"
                        type="number"
                        required
                        placeholder="Valor atual do MCI"
                        defaultValue={report.status?.valor ?? ""}
                        className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                    />
                </div>

                <div className="flex w-full justify-end">
                    <FormSubmitButton actionText="Salvar" pending={pending} isEditMode={false} />
                </div>

            </form>
        </GlobalDialog>
    )
}

export default AvaliacaoModal
