import DataTable from "react-data-table-component";
import { IDepartamento, IFilial } from "../../../types/cadastros/cadastros";
import { customStyles } from "../../utils/general";
import DeleteModal from "../../utils/deleteModal";
import { departamentosMock } from "../../../mocks/departamentos";
import CreateEditDepartamentoModal from "./createEditDepartamentoModal";


interface IManageFilialDataTable {
    filiais: IFilial[]
}
const ManageDepartamentosDataTable: React.FC<IManageFilialDataTable> = ({
    filiais
}) => {
    const data = departamentosMock

    const getFilialNome = (filial_uuid: string) => {
        return (
            filiais.find(
                filial => filial.id === filial_uuid
            )?.nome || '-'
        )
    }

    const columns = [
        {
            name: "Nome",
            selector: (row: IDepartamento) => row.nome,
            sortable: true,
            cell: (row: IDepartamento) => row.nome,
            grow: 1.5,
        },
        {
            name: "Filial pertencente",
            selector: (row: IDepartamento) => getFilialNome(row.filial_uuid),
            sortable: true,
            cell: (row: IDepartamento) => getFilialNome(row.filial_uuid),
            grow: 1.5,
        },
        {
            name: "Ações",
            cell: (row: IDepartamento) => {
                return <div className="flex">
                    <CreateEditDepartamentoModal isEditMode={true} filiais={filiais} departamentoData={row} />
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
                noDataComponent={<div>Nenhum departamento cadastrado</div>}
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

export default ManageDepartamentosDataTable;
