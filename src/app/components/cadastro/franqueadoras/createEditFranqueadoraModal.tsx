import { CiEdit } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";
import { IFranqueadora } from "../../../types/cadastros/cadastros";


interface ICreateEditLeaderModalProps {
    isEditMode?: boolean;
    franqueadoraData?: IFranqueadora
}


const CreateEditFranqueadoraModal: React.FC<ICreateEditLeaderModalProps> = ({ isEditMode = false, franqueadoraData }) => {
    return (
        <GlobalDialog
            title={isEditMode ? "Editar Franqueadora" : "Criar Nova Franqueadora"}
            contentClassName="w-1/4"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>) : (
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none">
                        Nova Franqueadora
                    </Button>
                )
            }
        >
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                        Nome da franqueadora
                    </label>
                    <input
                        className="
                            bg-white
                            w-full
                            rounded-xl
                            py-2
                             flex-1
                            ps-4
                            placeholder:text-slate-400
                            focus:outline-none
                            transition-colors
                            border-2
                            border-(--textBaseColor)/50
                            text-(--textBaseColor)
                        "
                        type='text'
                        id="usuario"
                        placeholder="Nova Franqueadora"
                        defaultValue={isEditMode ? franqueadoraData?.nome : ""}
                    />
                </div>


                <div className="flex justify-end">
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none mt-4"
                        type="submit">
                        {isEditMode ? "Salvar Alterações" : "Criar Usuário"}
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    )
}

export default CreateEditFranqueadoraModal;