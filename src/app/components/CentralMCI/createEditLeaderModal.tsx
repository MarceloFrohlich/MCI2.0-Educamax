import { CiEdit } from "react-icons/ci";
import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";
import { ILeader } from "../../types/centralMCI/centralMCI";

interface ICreateEditLeaderModalProps {
    isEditMode?: boolean;
    leaderData?: ILeader
}


const CreateEditLeaderModal: React.FC<ICreateEditLeaderModalProps> = ({ isEditMode=false, leaderData }) => {
    return (
        <GlobalDialog
            title={isEditMode ? "Editar Líder" : "Criar Novo Líder"}
            contentClassName="w-1/4"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>                ) : (
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none">
                        Novo Líder
                    </Button>
                )
            }
        >
            <form>
                <div className="flex flex-col gap-2">
                    <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                        Nome do Líder
                    </label>
                    <input
                        className="
                            peer
                            bg-white
                            w-full
                            rounded-xl
                            py-2
                            ps-4
                            placeholder:text-slate-400
                            focus:outline-none
                            transition-colors
                            border-2
                            border-(--textBaseColor)/50
                            text-(--textBaseColor)
                        "
                        type='text'
                        id="newleader"
                        placeholder="Novo Lider"
                        defaultValue={isEditMode ? leaderData?.nome : ""}
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none mt-4"
                        type="submit">
                        {isEditMode ? "Salvar Alterações" : "Criar Líder"}
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    )
}

export default CreateEditLeaderModal;