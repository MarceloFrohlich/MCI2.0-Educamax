import { PiFilesDuotone } from "react-icons/pi"
import GlobalDialog from "../utils/globalDialog"
import { Button } from "../../../components/ui/button"
import ResumeGameCard from "./resumeGameCard"
import { IGame } from "../../types/centralMCI/centralMCI"

interface IReplyGameProps {
    game: IGame
}

const ReplyGame: React.FC<IReplyGameProps> = ({ game }) => {
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
            <ResumeGameCard game={game} />
        </GlobalDialog>
    )
}

export default ReplyGame;