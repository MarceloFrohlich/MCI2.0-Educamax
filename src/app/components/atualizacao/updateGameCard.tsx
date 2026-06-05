'use client'
import { VscGraph } from "react-icons/vsc"
import { Button } from "../../../components/ui/button"
import WeeklyUpdate from "./weeklyUpdate"
import { IGame, IPrevidencia } from "../../types/centralMCI/centralMCI"
import { useEffect, useState } from "react"
import { GoAlertFill, GoGraph } from "react-icons/go"
import GlobalDialog from "../utils/globalDialog"
import MciEvolutionChart from "../Dashboard/graphs/MCIEvolutionChart"
import { weeklyActivitiesCount } from "../utils/general"
import MeasureGraphs from "./measuresGraphs"

interface UpdateGameCardProps {
    game: IGame
}

const UpdateGameCard: React.FC<UpdateGameCardProps> = ({ game }) => {

    const [selectedMedidaId, setSelectedMedidaId] = useState<string | null>(null)

    const selectedMedida =
        game.previdencias?.find(
            (previdencia) =>
                previdencia.id_previdencia === selectedMedidaId
        ) ?? null

    const jogoIniciado = game.previdencias.some(previdencia =>
        previdencia.semanas.some(semana =>
            semana.permite_lancamento ||
            semana.status === "disponivel" ||
            semana.status === "concluida"
        )
    )

    return (
        <section className="w-[45%] border-2 border-white shadow-lg h-60 rounded-xl p-4 relative">
            <div className="w-full justify-between flex">
                <div className="flex flex-col gap-2 flex-1 leading-3">
                    <h1 className="font-bold">{game.copa.departamento.nome}</h1>
                    <h1 className="font-bold">JOGO: <span>{game.nome}</span></h1>
                    <div className="flex justify-between items-center">
                        <p className="text-[12px]">Descrição: {game.verbo} {game.medida} de {game.de} para {game.para} até {game.data_fim}</p>
                        <div className="flex flex-col items-end gap-1">
                            <span>Líder</span>
                            <span className="font-bold text-sm">{game.lider.nome}</span>
                        </div>
                    </div>
                </div>
                {!jogoIniciado && (
                    <div className="flex gap-1 w-[10vw] items-center text-red-500 justify-start absolute right-0 top-4">
                        <GoAlertFill className="size-8" />
                        <p className="text-[9px]">
                            Atualização de placar indisponível no momento
                        </p>
                    </div>
                )}
                {jogoIniciado && (
                    <div>
                        <GlobalDialog
                            trigger={<GoGraph size={20} className="text-(--textBaseColor) hover:cursor-pointer" />}
                            contentClassName="w-4/6"
                            title="Acompanhamento visual"
                        >
                            <MeasureGraphs previdencias={game.previdencias} />
                        </GlobalDialog>
                    </div>
                )}
            </div>

            {game.previdencias && game.previdencias.length > 0 && (
                <div className="flex gap-2 w-full relative">
                    <div className=" my-2 flex flex-col gap-2 w-[30%]">
                        {game.previdencias.map((previdencia, index) => (
                            <Button
                                key={previdencia.id_previdencia}
                                onClick={() => setSelectedMedidaId(previdencia.id_previdencia)}
                                className="flex gap-2 items-center bg-transparent text-(--textBaseColor) hover:border hover:border-white hover:shadow-xl duration-300 hover:cursor-pointer hover:bg-white">
                                <VscGraph />
                                <p className="text-sm">Medida de direção {index + 1}</p>
                            </Button>
                        ))}
                    </div>
                    {selectedMedida && (
                        <div className="flex flex-col items-center absolute top-4 right-6 w-[65%]">
                            <span className="text-[14px] text-center leading-3">
                                {selectedMedida.verbo} {selectedMedida.unidade_medida} de {selectedMedida.placar_desejado} entre {selectedMedida.data_inicio} e {selectedMedida.data_fim}
                            </span>

                            <div className="absolute h-20 top-8 max-w-[99%] left-4 overflow-x-auto custom-scrollbar">
                                <WeeklyUpdate medida={selectedMedida} game={game} />
                            </div>
                        </div>
                    )}

                </div>
            )}


        </section>
    )
}

export default UpdateGameCard