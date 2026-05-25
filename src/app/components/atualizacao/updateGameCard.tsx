'use client'
import { VscGraph } from "react-icons/vsc"
import { Button } from "../../../components/ui/button"
import WeeklyUpdate from "./weeklyUpdate"
import { IDirectionMeasure, IGame } from "../../types/centralMCI/centralMCI"
import { useState } from "react"

interface UpdateGameCardProps {
    game: IGame
}

const UpdateGameCard: React.FC<UpdateGameCardProps> = ({ game }) => {

    const [selectedMedida, setSelectedMedida] = useState<IDirectionMeasure | null>(null)

    return (
        <section className="w-[45%] border-2 border-white shadow-lg h-60 rounded-xl p-4 relative">
            <div className="w-full justify-between flex">
                <div className="flex flex-col gap-2 flex-1 leading-3">
                    <h1 className="font-bold">{game.departamentos[0].nome}</h1>
                    <h1 className="font-bold">JOGO: <span>{game.nome}</span></h1>
                    <div className="flex justify-between items-center">
                        <p className="text-[12px]">Descrição: {game.verbo} {game.medida} de {game.de} para {game.para} até {game.fim}</p>
                        <span className="font-bold text-sm">{game.lider.nome}</span>
                    </div>
                </div>
                {/* <div className="flex gap-1 w-[10vw] items-center text-red-500 justify-start absolute right-0 top-4">
                    <GoAlertFill className="size-8" />
                    <p className="text-[9px]">Atualização de placar indísponível no momento</p>
                </div> */}
            </div>

            {game.medidasDirecao && game.medidasDirecao.length > 0 && (
                <div className="flex gap-2 w-full relative">
                    <div className=" my-2 flex flex-col gap-2 w-[30%]">
                        {game.medidasDirecao.map((medida, index) => (
                            <Button
                                key={medida.id}
                                onClick={() => setSelectedMedida(medida)}
                                className="flex gap-2 items-center bg-transparent text-(--textBaseColor) hover:border hover:border-white hover:shadow-xl duration-300 hover:cursor-pointer hover:bg-white">
                                <VscGraph />
                                <p className="text-sm">Medida de direção {index + 1}</p>
                            </Button>
                        ))}
                    </div>
                    {selectedMedida && (
                        <div className="flex flex-col items-center absolute top-4 right-6 w-[65%]">
                            <span className="text-[14px] text-center leading-3">
                                {selectedMedida.verbo} {selectedMedida.unidadeMedida} de {selectedMedida.placarDesejado} entre {selectedMedida.dataInicial} e {selectedMedida.dataFinal}
                            </span>

                            <div className="absolute top-16">
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