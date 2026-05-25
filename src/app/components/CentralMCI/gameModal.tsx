'use client'
import { useState } from "react";
import { IDirectionMeasure, IGame } from "../../types/centralMCI/centralMCI";
import CreateEditGameModal from "./createEditGameModal";
import DirectionMeasuresModal from "./directionMeasuresModal";
import DeleteModal from "../utils/deleteModal";
import ReplyGame from "./replyGame";

interface IGameModalProps {
    game: IGame
}

const GameModal: React.FC<IGameModalProps> = ({ game }) => {


    return (
        <section className="flex group">
            <div className=" 
                h-56
                hover:bg-white
                duration-300
              hover:text-(--textYellowColor)
              focus-within:text-(--textYellowColor)
                p-4
                w-56        
                rounded-[2rem]
                border-2
                border-white
                shadow-xl">

                <div className="flex flex-col justify-around h-full transition-colors">
                    <div className="flex flex-col justify-start h-full">
                        <p className="font-bold  text-[12px]">Instituição</p>
                        <p className="text-[13px]">{game.departamentos[0].nome}</p>
                    </div>
                    <div className="flex flex-col justify-start h-full">
                        <p className="font-bold  text-[12px]">Nome</p>
                        <p className="text-[13px]">{game.nome}</p>
                    </div>
                    <div className="flex flex-col justify-start h-full">
                        <p className="font-bold  text-[12px]">Líder</p>
                        <p className="text-[13px]">{game.lider?.nome}</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-start h-full">
                            <p className="font-bold  text-[12px]">Data Inicial</p>
                            <p className="text-[13px]">{game.inicio}</p>
                        </div>
                        <div className="flex flex-col justify-start h-full">
                            <p className="font-bold  text-[12px]">Data Final</p>
                            <p className="text-[13px]">{game.fim}</p>
                        </div>

                    </div>
                </div>

            </div>

            <div className="flex flex-col justify-around opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CreateEditGameModal isEditMode={true} gameData={game} />
                <DirectionMeasuresModal
                    isEditMode={true}
                    measures={game.medidasDirecao || []}
                />
                <ReplyGame game={game}/>
                <DeleteModal contentClassName="w-1/4" onConfirm={() => alert('clicou no delete')} />
            </div>
        </section>
    )
}

export default GameModal