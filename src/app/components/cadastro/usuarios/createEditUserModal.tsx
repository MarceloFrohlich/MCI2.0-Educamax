'use client'

import { CiEdit } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import GlobalDialog from "../../utils/globalDialog";
import { IDepartamento, IFilial, IFranqueadora, IUser } from "../../../types/cadastros/cadastros";
import { ISessao } from "../../../types/auth/auth";
import { NIVEL_FILIAL, NIVEL_FRANQUEADORA, ROLE_ADMIN_GLOBAL } from "../../../utils/permissoes";
import { useEffect, useState } from "react";
import { createUsuarioAction, updateUsuarioAction } from "../../../actions/cadastros/usuarios";
import { useServerAction } from "../../../hooks/useServerAction";


interface ICreateEditLeaderModalProps {
    isEditMode?: boolean;
    userData?: IUser
    departamentos: IDepartamento[]
    franqueadoras: IFranqueadora[]
    filiais: IFilial[]
    sessao: ISessao | null
}


const CreateEditUserModal: React.FC<ICreateEditLeaderModalProps> = ({ isEditMode = false, userData, departamentos, filiais, franqueadoras, sessao }) => {

    const [nivelPermissao, setNivelPermissao] = useState<string>(
        isEditMode
            ? userData?.nivel?.id_nivel?.toString() ?? ''
            : ''
    );

    const ehGlobal = sessao?.id_role === ROLE_ADMIN_GLOBAL;

    //admin global é conta de sistema (seed) - não se cria/promove pelo sistema
    const rolesDisponiveis = [
        { valor: '2', rotulo: 'Admin Local' },
        { valor: '3', rotulo: 'Usuário' },
    ];

    //só cria usuários do próprio nível pra baixo na hierarquia
    const nivelMinimo = ehGlobal ? 0 : sessao?.id_nivel ?? 0;
    const niveisDisponiveis = [
        { valor: '1', rotulo: 'Franqueadora' },
        { valor: '2', rotulo: 'Filial' },
        { valor: '3', rotulo: 'Departamento/Setor' },
    ].filter(nivel => Number(nivel.valor) >= nivelMinimo);

    //relações limitadas à cadeia do admin logado
    const franqueadorasVisiveis = ehGlobal
        ? franqueadoras
        : franqueadoras.filter(f => f.id_franqueadora === sessao?.relacao);

    const filiaisVisiveis = ehGlobal
        ? filiais
        : sessao?.id_nivel === NIVEL_FRANQUEADORA
            ? filiais.filter(f => f.id_franqueadora === sessao.relacao)
            : filiais.filter(f => f.id_filial === sessao?.relacao);

    const departamentosVisiveis = ehGlobal
        ? departamentos
        : sessao?.id_nivel === NIVEL_FRANQUEADORA
            ? departamentos.filter(d => d.filial?.id_franqueadora === sessao.relacao)
            : sessao?.id_nivel === NIVEL_FILIAL
                ? departamentos.filter(d => d.id_filial === sessao.relacao)
                : departamentos.filter(d => d.id_departamento === sessao?.relacao);

    //no listar da api, relacao vira o rótulo do tipo; o uuid real está na entidade_relacao
    const relacaoInicial = () => {
        if (!userData?.entidade_relacao) return '';
        if (userData.relacao === 'franqueadora') return userData.entidade_relacao.id_franqueadora;
        if (userData.relacao === 'filial') return userData.entidade_relacao.id_filial;
        return userData.entidade_relacao.id_departamento;
    };

    const [relacao, setRelacao] = useState(relacaoInicial);

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
            contentClassName="w-[95%] md:w-1/2"
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
                <div className="flex flex-col md:flex-row justify-between gap-4">
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
                
                {!isEditMode && (
                    <p className="text-sm text-(--textBaseColor)/60">
                        O usuário receberá um convite por e-mail para definir a própria senha (link válido por 2 dias).
                    </p>
                )}
                <div className="flex flex-col md:flex-row justify-between gap-4">
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
                            {rolesDisponiveis.map(role => (
                                <option key={role.valor} value={role.valor}>{role.rotulo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
                            Nível de permissões
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
                            {niveisDisponiveis.map(nivel => (
                                <option key={nivel.valor} value={nivel.valor}>{nivel.rotulo}</option>
                            ))}
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
                        >
                            <option value=''>Selecione</option>
                            {franqueadorasVisiveis.map(franqueadora => (
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
                        >
                            <option value=''>Selecione</option>
                            {filiaisVisiveis.map(filial => (
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
                        >
                            <option value=''>Selecione</option>
                            {departamentosVisiveis.map(departamento => (
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