'use client'

import DataTable, { TableColumn } from "react-data-table-component";
import CreateEditUserModal from "./createEditUserModal";
import {
    IDepartamento,
    IFilial,
    IFranqueadora,
    IUser,
    IUserDepartamento,
    IUserFilial,
    IUserFranqueadora
} from "../../../types/cadastros/cadastros";

import { customStyles } from "../../utils/general";
import { deleteUsuarioAction } from "../../../actions/cadastros/usuarios";
import DeleteModal from "../../utils/deleteModal";

interface IManageUsersDataTable {
    usuarios: IUser[]
    departamentos: IDepartamento[]
    franqueadoras: IFranqueadora[]
    filiais: IFilial[]
}

const ManageUsersDataTable: React.FC<IManageUsersDataTable> = ({
    usuarios,
    departamentos,
    filiais,
    franqueadoras
}) => {

    const parseUser = (user: any): IUser => {

        if (!user.entidade_relacao) {
            return {
                ...user,
                relacao: 'franqueadora',
                entidade_relacao: null
            } as IUserFranqueadora
        }

        switch (user.id_nivel) {

            case 1:
                return {
                    ...user,
                    relacao: 'franqueadora',
                } as IUserFranqueadora

            case 2:
                return {
                    ...user,
                    relacao: 'filial',
                } as IUserFilial

            case 3:
                return {
                    ...user,
                    relacao: 'departamento',
                } as IUserDepartamento

            default:
                return user
        }
    }

    const parsedUsers = usuarios.map(parseUser)

    const getRelacaoNome = (user: IUser) => {
        return user.entidade_relacao?.nome || '-'
    }

    const getTipoRelacao = (user: IUser) => {

        switch (user.relacao) {

            case 'franqueadora':
                return 'Franqueadora'

            case 'filial':
                return 'Filial'

            case 'departamento':
                return 'Departamento'

            default:
                return '-'
        }
    }

    const columns: TableColumn<IUser>[] = [
        {
            name: "Nome",
            selector: (row) => row.nome,
            sortable: true,
            cell: (row) => row.nome,
            grow: 1.5,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            cell: (row) => row.email,
            grow: 1.5,
        },
        {
            name: "Nivel Usuário",
            selector: (row) => row.role.nome,
            sortable: true,
            cell: (row) => row.role.nome,
            grow: 1.5,
        },
        {
            name: "Nível Permissão",
            selector: (row) => row.nivel.nome,
            sortable: true,
            cell: (row) => row.nivel.nome,
            grow: 1.5,
        },
        {
            name: "Relação",
            selector: (row) => getRelacaoNome(row),
            sortable: true,

            cell: (row) => (
                <div className="flex flex-col py-2">
                    <span>
                        {getRelacaoNome(row)}
                    </span>

                    <span className="text-xs text-muted-foreground">
                        {getTipoRelacao(row)}
                    </span>
                </div>
            ),

            grow: 1.5,
        },
        {
            name: "Ações",

            cell: (row) => {
                return (
                    <div className="flex">
                        <CreateEditUserModal
                            isEditMode={true}
                            departamentos={departamentos}
                            filiais={filiais}
                            franqueadoras={franqueadoras}
                            userData={row}
                        />

                        <DeleteModal
                            action={deleteUsuarioAction}
                            id={row.id_usuario}
                        />
                    </div>
                );
            },

            right: true,
            grow: 1,
        },
    ];

    return (
        <div className="w-full max-h-[80vh] rounded-lg shadow-[0_10px_35px_rgba(93,120,183,0.22)]">

            <DataTable
                columns={columns}
                data={parsedUsers}
                responsive
                pagination
                customStyles={customStyles}
                noDataComponent={<div>Nenhum usuário cadastrado</div>}
                paginationPerPage={8}
                paginationRowsPerPageOptions={[5]}

                paginationComponentOptions={{
                    rowsPerPageText: "Linhas por página:",
                    rangeSeparatorText: "de",
                    noRowsPerPage: false,
                    selectAllRowsItem: false,
                    selectAllRowsItemText: "Selecionar todos",
                }}
            />

        </div>
    );
};

export default ManageUsersDataTable;