'use client'
import { IoMdClose } from "react-icons/io"
import { IGame, IPrevidencia } from "../../types/centralMCI/centralMCI"
import UpdateWeeklyMeasure from "./updateWeeklyMeasure"

interface WeeklyUpdateProps {
    medida: IPrevidencia
    game: IGame
}

const WeeklyUpdate:React.FC<WeeklyUpdateProps> = ({ medida, game }) => {


    const limite = medida.semanas.findIndex(week => week.permite_lancamento)

    return (
        <section className="flex items-center gap-4">
            {medida.semanas.map((semana, i) => (
                <div key={i} className="flex items-center">
                    <div className="relative flex items-center justify-center w-6 h-6">
                        {i !== medida.semanas.length - 1 && (
                            <>
                                <div className="absolute left-full top-1.75 w-5 h-2 border-y border-[#112C46] overflow-hidden">
                                    {i < limite && <div className="w-full h-full bg-[#112C46]" />}
                                </div>
                            </>
                        )}
                        <div className={`z-10 w-6 h-6 rounded-sm border-2 border-[#112C46] bg-white flex items-center justify-center`}>
                            {semana.status === "concluída" && <UpdateWeeklyMeasure measure={medida} game={game} isEditMode={true} semana={semana}/>}
                            {semana.status === "disponivel" && <UpdateWeeklyMeasure measure={medida} game={game} isEditMode={false} semana={semana} />}
                            {semana.status === "indisponivel" && <IoMdClose className="text-[#112C46] text-xs" />}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default WeeklyUpdate