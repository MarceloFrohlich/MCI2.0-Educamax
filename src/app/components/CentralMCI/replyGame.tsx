import { PiFilesDuotone } from "react-icons/pi"
import GlobalDialog from "../utils/globalDialog"
import { Button } from "../../../components/ui/button"
import ResumeGameCard from "./resumeGameCard"
import { ICup, IGame } from "../../types/centralMCI/centralMCI"
import { IDepartamento } from "../../types/cadastros/cadastros"

interface IReplyGameProps {
    game: IGame
    departamentos: IDepartamento[]
    copas: ICup[]
}

const ReplyGame: React.FC<IReplyGameProps> = ({ game, departamentos, copas }) => {
    return (
        <GlobalDialog
            contentClassName="w-1/2"
            trigger={
                <Button
                    type="button"
                    className="
                            bg-transparent
                            hover:bg-transparent
                            shadow-none
                            p-0
                            hover:cursor-pointer
                        "
                >

                    <PiFilesDuotone className="text-(--textBaseColor) size-5" />

                </Button>}
            title="Duplicar jogo"
        >
            <ResumeGameCard game={game} departamentos={departamentos} copas={copas}/>
        </GlobalDialog>
    )
}

export default ReplyGame;