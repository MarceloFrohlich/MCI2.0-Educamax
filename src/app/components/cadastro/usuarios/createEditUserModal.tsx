import { CiEdit } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";
import { IUser } from "../../../types/cadastros/cadastros";


interface ICreateEditLeaderModalProps {
    isEditMode?: boolean;
    userData?: IUser
}


const CreateEditUserModal: React.FC<ICreateEditLeaderModalProps> = ({ isEditMode = false, userData }) => {
    return (
        <GlobalDialog
            title={isEditMode ? "Editar Usuário" : "Criar Novo Usuário"}
            contentClassName="w-1/2"
            trigger={
                isEditMode ? (
                    <Button className="bg-transparent hover:cursor-pointer">
                        <CiEdit className="text-green-700 size-5" />
                    </Button>) : (
                    <Button
                        className="hover:cursor-pointer bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 border-none">
                        Novo Usuário
                    </Button>
                )
            }
        >
            <form className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Nome do Usuário
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
                            placeholder="Novo Usuário"
                            defaultValue={isEditMode ? userData?.nome : ""}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Email do Usuário
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
                            id="email"
                            placeholder="seuemail@exemplo.com"
                            defaultValue={isEditMode ? userData?.email : ""}
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-4 ">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
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
                            type='text'
                            id="senha"
                            placeholder="Digite uma senha segura"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Confirme sua senha
                        </label>
                        <input
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
                            type='text'
                            id="confirmaSenha"
                            placeholder="Repita sua senha"
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Nível de usuário
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
                            id="nivelUsuario"
                            defaultValue={isEditMode ? userData?.nivelUsuario : ""}
                        >
                            <option value=''>Selecione</option>
                            <option value='1'>Local Admin</option>
                            <option value='2'>Usuário</option>

                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Nome de permissões
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
                            id="nivelPermissao"
                            defaultValue={isEditMode ? userData?.nivelPermissao : ""}
                        >
                            <option value=''>Selecione</option>
                            <option value='1'>Franqueadora</option>
                            <option value='2'>Filial</option>
                            <option value='3'>Departamento/Setor</option>

                        </select>
                    </div>
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

export default CreateEditUserModal;