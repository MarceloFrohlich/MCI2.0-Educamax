'use client'

import { FaCheck } from "react-icons/fa"
import GlobalDialog from "../utils/globalDialog"
import { Button } from "../../../components/ui/button"
import { IDirectionMeasure, IGame, ISemana } from "../../types/centralMCI/centralMCI"
import FormSubmitButton from "../utils/formSubmitButton"

interface UpdateWeeklyMeasureProps {
    game: IGame
    measure: IDirectionMeasure
    isEditMode?: boolean
    semana: ISemana
}

const UpdateWeeklyMeasure: React.FC<UpdateWeeklyMeasureProps> = ({ measure, game, isEditMode, semana }) => {

    function weeklyActivitiesCount(measure: IDirectionMeasure) {
        const semanas = measure.semanas.length
        const atividadesTotal = measure.placarDesejado
        return (atividadesTotal / semanas).toFixed(2).replace(".", ",")
    }

    return (
        <GlobalDialog title="Atualização semanal"
            contentClassName="w-[33%] max-h-[80vh] overflow-y-auto"
            trigger={isEditMode ? (
                    <div className="w-full h-full bg-[#112C46] hover:cursor-pointer" />
                ) : (
                    <Button className="hover:cursor-pointer bg-transparent" children={<FaCheck className="text-[#112C46] text-[10px]" />} />

                )}
        >
            <form className="flex flex-col gap-4">
                <div>
                    <h1 className="text-lg fonte-bold">Medida de direção</h1>
                    <p>{measure.verbo} {measure.placarDesejado} {measure.unidadeMedida} até {measure.dataFinal}</p>
                </div>

                <div>
                    <h1 className="text-lg fonte-bold">Quantidade de atividades semanais: {weeklyActivitiesCount(measure)}</h1>
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
                        className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
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
                        defaultValue={semana.lancamento?.compromisso  ?? ""}
                        className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                    />
                </div>

                {game && game.incluirPLP && (
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
                                defaultValue={semana.lancamento?.entrevistaqtd ?? ""}
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
                                defaultValue={semana.lancamento?.promotores ?? ""}
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
                                defaultValue={semana.lancamento?.neutros ?? ""}
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
                                defaultValue={semana.lancamento?.detratores ?? ""}
                                className="bg-white rounded-xl py-2 ps-4 placeholder:text-slate-400 focus:outline-none                  transition-colors border-2 border-(--textBaseColor)/50 text-(--textBaseColor) w-full"
                            />
                        </div>
                    </div>
                )}

                <div className="flex w-full justify-end ">
                    <FormSubmitButton />
                </div>

            </form>
        </GlobalDialog>
    )
}

export default UpdateWeeklyMeasure