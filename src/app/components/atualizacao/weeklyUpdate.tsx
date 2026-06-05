'use client'

import { IoMdClose } from "react-icons/io"
import { IGame, IPrevidencia } from "../../types/centralMCI/centralMCI"
import UpdateWeeklyMeasure from "./updateWeeklyMeasure"
import { weeklyActivitiesCount } from "../utils/general"

interface WeeklyUpdateProps {
    medida: IPrevidencia
    game: IGame
}

const WeeklyUpdate: React.FC<WeeklyUpdateProps> = ({ medida, game }) => {

    const limite = medida.semanas.findIndex(
        week => week.permite_lancamento
    )

    function formatApiDate(date: string): string {
        if (!date) return '';

        const [, month, day] = date.split('-');

        return `${day}/${month}`;
    }

    return (
        <section className="flex items-start gap-4 relative pt-8">
            {medida.semanas.map((semana, i) => (
                <div
                    key={i}
                    className="flex flex-col items-center relative"
                >
                    {/* Data */}
                    <span className="absolute -top-7 left-1 text-[11px] font-semibold text-(--textBaseColor) whitespace-nowrap rotate-[-20deg]">
                        {formatApiDate(semana.data_previsto_lancamento)}
                    </span>

                    {/* Linha entre os itens */}
                    <div className="relative flex items-center justify-center w-6 h-6">
                        {i !== medida.semanas.length - 1 && (
                            <div className="absolute left-full top-1.75 w-5 h-2 border-y border-[#112C46] overflow-hidden">
                                {i < limite && (
                                    <div className="w-full h-full bg-[#112C46]" />
                                )}
                            </div>
                        )}

                        {/* Quadrado */}
                        <div className={`z-10 w-6 h-6 rounded-sm border-2 ${(semana.status === "concluida") && (semana.lancamento?.realizado < weeklyActivitiesCount(medida)) ? "border-red-500" : "border-[#112C46]"} bg-white flex items-center justify-center`}>
                            {semana.status === "concluida" && (
                                <UpdateWeeklyMeasure
                                    weeklyActivitiesCount={weeklyActivitiesCount(medida)}
                                    measure={medida}
                                    game={game}
                                    isEditMode={true}
                                    semana={semana}
                                />
                            )}

                            {semana.status === "disponivel" && (
                                <UpdateWeeklyMeasure
                                    weeklyActivitiesCount={weeklyActivitiesCount(medida)}
                                    measure={medida}
                                    game={game}
                                    isEditMode={false}
                                    semana={semana}
                                />
                            )}

                            {semana.status === "indisponivel" && (
                                <IoMdClose className="text-[#112C46] text-xs" />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default WeeklyUpdate