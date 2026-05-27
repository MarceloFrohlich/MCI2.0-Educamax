'use client'

import { CiEdit } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";
import { IDepartamento, IFilial, IFranqueadora, IUser } from "../../../types/cadastros/cadastros";
import { useEffect, useState } from "react";
import { createUsuarioAction, updateUsuarioAction } from "../../../actions/cadastros/usuarios";
import { useServerAction } from "../../../hooks/useServerAction";


interface ICreateEditLeaderModalProps {
    isEditMode?: boolean;
    userData?: IUser
    departamentos: IDepartamento[]
    franqueadoras: IFranqueadora[]
    filiais: IFilial[]
}


const CreateEditUserModal: React.FC<ICreateEditLeaderModalProps> = ({ isEditMode = false, userData, departamentos, filiais, franqueadoras }) => {

    const [nivelPermissao, setNivelPermissao] = useState<string>(
        isEditMode
            ? userData?.nivel?.id_nivel?.toString() ?? ''
            : ''
    );

    const [relacao, setRelacao] = useState(
        userData?.relacao ?? ''
    );

    const [open, setOpen] = useState(false);

    const action = isEditMode
        ? updateUsuarioAction
        : createUsuarioAction;

    const {
        state,
        formAction,
        pending
    } = useServerAction(action);

    useEffect(() => {
        if (
            state.success &&
            isEditMode
        ) {
            setOpen(false);

        }

    }, [state, isEditMode]);

    return (
        <GlobalDialog
            open={open}
            onOpenChange={setOpen}
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
            <form action={formAction} className="flex flex-col gap-4">

                 {isEditMode && (
                    <input
                        type="hidden"
                        name="id"
                        value={userData?.id_usuario}
                    />
                )}
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
                            name="nome"
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
                            name="email"
                            placeholder="seuemail@exemplo.com"
                            defaultValue={isEditMode ? userData?.email : ""}
                        />
                    </div>
                </div>
                
                <div 
                className={`flex justify-between gap-4 ${isEditMode ? 'hidden' : ''}`}>
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
                            type='password'
                            id="senha"
                            name="senha"
                            placeholder="Digite uma senha segura"
                        />
                    </div>
                    <div className={`flex flex-col gap-2 w-full ${isEditMode ? 'hidden' : ''}`}>
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
                            type='password'
                            id="confirmaSenha"
                            name="confirmaSenha"
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
                            name="nivelUsuario"
                            defaultValue={isEditMode ? userData?.id_role : ""}
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
                            value={nivelPermissao}
                            onChange={(e) => setNivelPermissao(e.target.value)}
                            id="nivelPermissao"
                            name="nivelPermissao"
                        >
                            <option value=''>Selecione</option>
                            <option value='1'>Franqueadora</option>
                            <option value='2'>Filial</option>
                            <option value='3'>Departamento/Setor</option>
                        </select>
                    </div>
                </div>

                {nivelPermissao === '1' && (
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Relação
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
                            value={relacao}
                            onChange={(e) => setRelacao(e.target.value)}
                            id="relacao1"
                            name="relacao"
                            defaultValue={isEditMode ? userData?.relacao : ""}
                        >
                            <option value=''>Selecione</option>
                            {franqueadoras && franqueadoras.map(franqueadora => (
                                <option key={franqueadora.id_franqueadora} value={franqueadora.id_franqueadora}>{franqueadora.nome}</option>
                            ))}
                        </select>
                    </div>
                )}
                {nivelPermissao === '2' && (
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Relação
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
                            value={relacao}
                            onChange={(e) => setRelacao(e.target.value)}
                            id="relacao2"
                            name="relacao"
                            defaultValue={isEditMode ? userData?.relacao : ""}
                        >
                            <option value=''>Selecione</option>
                            {filiais && filiais.map(filial => (
                                <option key={filial.id_filial} value={filial.id_filial}>{filial.nome}</option>
                            ))}
                        </select>
                    </div>
                )}
                {nivelPermissao === '3' && (
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="relacao" className="block text-sm font-medium text-gray-700">
                            Relação
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
                            value={relacao}
                            onChange={(e) => setRelacao(e.target.value)}
                            id="relacao3"
                            name="relacao"
                            defaultValue={isEditMode ? userData?.relacao : ""}
                        >
                            <option value=''>Selecione</option>
                            {departamentos && departamentos.map(departamento => (
                                <option key={departamento.id_departamento} value={departamento.id_departamento}>{departamento.nome}</option>
                            ))}
                        </select>
                    </div>
                )}


                <div className="flex justify-end">
                    <Button
                        disabled={pending}
                        className="
                            hover:cursor-pointer
                            bg-(--colorVariantBlue)
                            text-white
                            hover:bg-(--colorVariantBlue)/80
                            duration-300
                            border-none
                            mt-4
                        "
                        type="submit"
                    >
                        {pending
                            ? "Salvando..."
                            : isEditMode
                                ? "Salvar Alterações"
                                : "Criar Usuário"
                        }
                    </Button>
                </div>
            </form>
        </GlobalDialog>
    )
}

export default CreateEditUserModal;