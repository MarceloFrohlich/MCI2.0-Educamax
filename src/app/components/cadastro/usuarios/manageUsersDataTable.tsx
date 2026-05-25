import DataTable from "react-data-table-component";
import DeleteModal from "../../utils/deleteModal";
import { usuariosMock } from "../../../mocks/usuarios";
import CreateEditUserModal from "./createEditUserModal";
import { IUser } from "../../../types/cadastros/cadastros";
import { customStyles } from "../../utils/general";

const ManageUsersDataTable: React.FC = ({
}) => {

    const data = usuariosMock

    const columns = [
        {
            name: "Nome",
            selector: (row: IUser) => row.nome,
            sortable: true,
            cell: (row: IUser) => row.nome,
            grow: 1.5,
        },
        {
            name: "Email",
            selector: (row: IUser) => row.email,
            sortable: true,
            cell: (row: IUser) => row.email,
            grow: 1.5,
        },
        {
            name: "Nivel Usuário",
            selector: (row: IUser) => row.nivelUsuario,
            sortable: true,
            cell: (row: IUser) => ( row.nivelUsuario === 1 ? 'Local Admin' : 'Usuário' ),
            grow: 1.5,
        },
        {
            name: "Nível Permissão",
            selector: (row: IUser) => row.nivelPermissao,
            sortable: true,
            cell: (row: IUser) => (
                row.nivelPermissao === 1
                ? 'Departamento/Setor'
                : row.nivelPermissao === 2
                    ? 'Filial'
                    : row.nivelPermissao === 3
                        ? 'Franqueadora'
                        : ''
            ),
            grow: 1.5,
        },
        {
            name: "Ações",
            cell: (row: IUser) => {
                return <div className="flex">
                    <CreateEditUserModal isEditMode={true} userData={row} />
                    <DeleteModal onConfirm={() => alert('clicou no delete')} />
                </div>;
            },
            right: true,
            grow: 1,
        },
    ];

    return (
        <div className="w-full max-h-[80vh] rounded-lg shadow-[0_10px_35px_rgba(93,120,183,0.22)]">
            <DataTable
                columns={columns}
                data={data}
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
