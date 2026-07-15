'use client'

import { PiFilesDuotone } from "react-icons/pi"
import GlobalDialog from "../utils/globalDialog"
import { Button } from "../../../components/ui/button"
import ResumeGameCard from "./resumeGameCard"
import { ICup, IGame } from "../../types/centralMCI/centralMCI"
import { IDepartamento } from "../../types/cadastros/cadastros"
import { useState } from "react"

interface IReplyGameProps {
    game: IGame
    departamentos: IDepartamento[]
    copas: ICup[]
}

const ReplyGame: React.FC<IReplyGameProps> = ({ game, copas }) => {

    const [open, setOpen] = useState(false);

    return (
        <GlobalDialog
            open={open}
            onOpenChange={setOpen}
            contentClassName="w-[95%] md:w-1/2"
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
            <ResumeGameCard game={game} copas={copas} open={open} setOpen={setOpen} />
        </GlobalDialog>
    )
}

export default ReplyGame;