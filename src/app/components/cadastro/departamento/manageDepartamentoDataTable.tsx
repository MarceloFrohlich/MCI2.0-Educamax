'use client'

import DataTable from "react-data-table-component";
import { IDepartamento, IFilial } from "../../../types/cadastros/cadastros";
import { customStyles } from "../../utils/general";
import CreateEditDepartamentoModal from "./createEditDepartamentoModal";
import DeleteModal from "../../utils/deleteModal";
import { deleteDepartamentoAction } from "../../../actions/cadastros/departamentos";


interface IManageFilialDataTable {
    filiais: IFilial[]
    departamentos: IDepartamento[]
}
const ManageDepartamentosDataTable: React.FC<IManageFilialDataTable> = ({
    filiais, departamentos
}) => {

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
            selector: (row: IDepartamento) => row.filial.nome,
            sortable: true,
            cell: (row: IDepartamento) => row.filial.nome,
            grow: 1.5,
        },
        {
            name: "Ações",
            cell: (row: IDepartamento) => {
                return <div className="flex">
                    <CreateEditDepartamentoModal isEditMode={true} filiais={filiais} departamentoData={row} />
                    <DeleteModal action={deleteDepartamentoAction} id={row.id_departamento} />
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
                data={departamentos || []}
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
