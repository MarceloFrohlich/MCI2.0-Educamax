import { ICup, IGame, ILeader } from "../../types/centralMCI/centralMCI";
import CreateEditGameModal from "./createEditGameModal";
import DirectionMeasuresModal from "./directionMeasuresModal";
import DeleteModal from "../utils/deleteModal";
import ReplyGame from "./replyGame";
import { IDepartamento } from "../../types/cadastros/cadastros";

interface IGameModalProps {
    game: IGame
    copas: ICup[]
    departamentos: IDepartamento[]
    leaders: ILeader[]
}

const GameModal: React.FC<IGameModalProps> = ({ game, copas, departamentos, leaders }) => {


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
                        <p className="text-[13px]">{game.copa.departamento.nome}</p>
                    </div>
                    <div className="flex flex-col justify-start h-full">
                        <p className="font-bold  text-[12px]">Nome</p>
                        <p className="text-[13px]">{game.nome}</p>
                    </div>
                    <div className="flex flex-col justify-start h-full">
                        <p className="font-bold  text-[12px]">Líder</p>
                        <p className="text-[13px]">{game.lider?.nome}</p>
                    </div>
                    <div className="flex justify-start items-center gap-4 h-full">
                        <p className="font-bold  text-[12px]">Tem PLP?</p>
                        <p className="text-[13px]">{game.tem_plp === true ? 'Sim' : 'Não'}</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-start h-full">
                            <p className="font-bold  text-[12px]">Data Inicial</p>
                            <p className="text-[13px]">{game.data_inicio}</p>
                        </div>
                        <div className="flex flex-col justify-start h-full">
                            <p className="font-bold  text-[12px]">Data Final</p>
                            <p className="text-[13px]">{game.data_fim}</p>
                        </div>

                    </div>
                </div>

            </div>

            <div className="flex flex-col justify-around opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CreateEditGameModal isEditMode={true} gameData={game} copas={copas} leaders={leaders} />
                <DirectionMeasuresModal
                    isEditMode={true}
                    measures={game.previdencias || []}
                />
                <ReplyGame game={game} departamentos={departamentos} copas={copas}/>
                {/* <DeleteModal contentClassName="w-1/4" action={() => alert('clicou no delete')} /> */}
            </div>
        </section>
    )
}

export default GameModal