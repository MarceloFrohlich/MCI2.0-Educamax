'use client'

import { FaCheck } from "react-icons/fa"
import GlobalDialog from "../utils/globalDialog"
import { Button } from "../../../components/ui/button"
import { IGame, IPrevidencia, ISemana } from "../../types/centralMCI/centralMCI"
import { useEffect, useState } from "react"
import { atualizacaoSemanalAction } from "../../actions/jogos/jogos"
import { useServerAction } from "../../hooks/useServerAction"
import FormSubmitButton from "../utils/formSubmitButton"
import { toast } from "sonner"

interface UpdateWeeklyMeasureProps {
    game: IGame
    measure: IPrevidencia
    isEditMode: boolean
    semana: ISemana
    weeklyActivitiesCount: number
}

const UpdateWeeklyMeasure: React.FC<UpdateWeeklyMeasureProps> = ({ measure, game, isEditMode, semana, weeklyActivitiesCount }) => {

    const [open, setOpen] = useState(false);

    const action = atualizacaoSemanalAction

    const {
        state,
        formAction,
        pending
    } = useServerAction(action);

    useEffect(() => {
        if (state.success === true && state.successMessage) {
            toast.success(state.success === true && state.successMessage);
            setOpen(false);
            return;
        }

        if (state.success === false && state.errorMessage) {
            toast.error(state.success === false && state.errorMessage);
        }

    }, [state, isEditMode]);

    return (
        <GlobalDialog title="Atualização semanal"
            open={open}
            onOpenChange={setOpen}
            contentClassName="w-[95%] sm:w-2/3 lg:w-[33%] max-h-[80vh] overflow-y-auto"
            trigger={isEditMode ? (
                <div className={`w-full h-full ${semana.lancamento?.realizado > weeklyActivitiesCount ? "bg-[#112C46]" : "bg-red-500"} hover:cursor-pointer`} />
            ) : (
                <Button className="hover:cursor-pointer bg-transparent"><FaCheck className="text-[#112C46] text-[10px]" /></Button>

            )}
        >
            <form action={formAction} className="flex flex-col gap-4">

                <input
                    type="hidden"
                    name="tem_plp"
                    value={game.tem_plp ? "true" : "false"}
                />
                <input
                    type="hidden"
                    name="previdenciaId"
                    value={measure.id_previdencia}
                />
                <input
                    type="hidden"
                    name="semana"
                    value={semana.numero_semana}
                />

                <div>
                    <h1 className="text-lg fonte-bold">Medida de direção</h1>
                    <p>{measure.verbo} {measure.placar_desejado} {measure.unidade_medida} até {measure.data_fim}</p>
                </div>

                <div>
                    <h1 className="text-lg fonte-bold">Quantidade de atividades semanais: {weeklyActivitiesCount?.toFixed(2).replace(".", ",")}</h1>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="realizado" className="text-sm font-medium text-gray-700">
                        Realizado na semana
                    </label>

                    <input
                        id="realizado"
                        name="realizado"
                        type="text"
                        placeholder="O que foi realizado nessa semana"
                        defaultValue={semana.lancamento?.realizado ?? ""}
                        className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="realizado" className="text-sm font-medium text-gray-700">
                        Compromisso para a próxima semana
                    </label>

                    <input
                        id="compromisso"
                        name="compromisso"
                        type="text"
                        placeholder="Previsão de atividades a serem realizadas"
                        defaultValue={semana.lancamento?.compromisso ?? ""}
                        className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                    />
                </div>

                {game && game.tem_plp && (
                    <div>



                        <div>
                            <h1 className="text-lg fonte-bold">Pontuação líquida de Propagação</h1>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="realizado" className="text-sm font-medium text-gray-700">
                                Quantas entrevistas foram feitas essa semana?
                            </label>

                            <input
                                id="entrevistaqtd"
                                name="entrevistaqtd"
                                type="text"
                                placeholder="Entrevistas realizadas"
                                defaultValue={semana.lancamento?.plp?.entrevistaqtd ?? ""}
                                className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="realizado" className="text-sm font-medium text-gray-700">
                                Dos entrevistados, quantos avaliaram com 9 ou 10?
                            </label>

                            <input
                                id="promotores"
                                name="promotores"
                                type="text"
                                placeholder="Quantidade de promotores"
                                defaultValue={semana.lancamento?.plp?.promotores ?? ""}
                                className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="realizado" className="text-sm font-medium text-gray-700">
                                Dos entrevistados, quantos avaliaram com 7 ou 8?
                            </label>

                            <input
                                id="neutros"
                                name="neutros"
                                type="text"
                                placeholder="Quantidade de neutros"
                                defaultValue={semana.lancamento?.plp?.neutros ?? ""}
                                className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="realizado" className="text-sm font-medium text-gray-700">
                                Dos entrevistados, quantos avaliaram de 0 ou 6?
                            </label>

                            <input
                                id="detratores"
                                name="detratores"
                                type="text"
                                placeholder="Quantidade de detratores"
                                defaultValue={semana.lancamento?.plp?.detratores ?? ""}
                                className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                            />
                        </div>
                    </div>
                )}

                <div className="flex w-full justify-end ">
                    <FormSubmitButton actionText="Salvar Atualização" pending={pending} isEditMode={isEditMode} />
                </div>

            </form>
        </GlobalDialog>
    )
}

export default UpdateWeeklyMeasure