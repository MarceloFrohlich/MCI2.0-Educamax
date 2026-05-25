import { CiEdit } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";
import { IFilial, IFranqueadora } from "../../../types/cadastros/cadastros";
import { franqueadorasMock } from "../../../mocks/franqueadoras";


interface ICreateEditFilialModal {
    isEditMode?: boolean;
    filialData?: IFilial
    franqueadoras: IFranqueadora[]
}


const CreateEditFilialModal: React.FC<ICreateEditFilialModal> = ({ isEditMode = false, filialData, franqueadoras }) => {
    return (
        <GlobalDialog
            title={isEditMode ? "Editar Franqueadora" : "Criar Nova Franqueadora"}
            contentClassName="w-1/2"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>) : (
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none">
                        Nova Filial
                    </Button>
                )
            }
        >
            <form className="flex flex-col gap-4">

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Franqueadoras
                        </label>
                        <select
                            className="
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
                            id="franqueadoras"
                            defaultValue={isEditMode ? filialData?.franqueadora_uuid : ""}
                        >
                            <option value=''>Selecione a franqueadora</option>
                            {franqueadorasMock && franqueadorasMock.map(franqueadora => (
                                <option
                                    key={franqueadora.id}
                                    value={franqueadora.id}
                                >{franqueadora.nome}</option>
                            ))}

                        </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Nome da Filial
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
                            placeholder="Nova Filial"
                            defaultValue={isEditMode ? filialData?.nome : ""}
                        />
                    </div>
                </div>


                <div className="flex justify-end">
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none mt-4"
                        type="submit">
                        {isEditMode ? "Salvar Alterações" : "Criar Filial"}
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    )
}

export default CreateEditFilialModal;