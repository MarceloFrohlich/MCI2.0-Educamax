'use client'

import DataTable from "react-data-table-component";
import { IFilial, IFranqueadora } from "../../../types/cadastros/cadastros";
import { customStyles } from "../../utils/general";
import DeleteModal from "../../utils/deleteModal";
import CreateEditFilialModal from "./createEditFilialModal";
import { deleteFilialAction } from "../../../actions/cadastros/filiais";

interface IManageFilialDataTable {
    franqueadoras: IFranqueadora[]
    filiais: IFilial[]
}
const ManageFilialDataTable: React.FC<IManageFilialDataTable> = ({
    franqueadoras, filiais
}) => {

    const columns = [
        {
            name: "Nome",
            selector: (row: IFilial) => row.nome,
            sortable: true,
            cell: (row: IFilial) => row.nome,
            grow: 1.5,
        },
        {
            name: "Franqueadora pertencente",
            selector: (row: IFilial) => row.franqueadora.nome,
            sortable: true,
            cell: (row: IFilial) => row.franqueadora.nome,
            grow: 1.5,
        },
        {
            name: "Ações",
            cell: (row: IFilial) => {
                return <div className="flex">
                    <CreateEditFilialModal isEditMode={true} filialData={row} franqueadoras={franqueadoras} />
                    <DeleteModal action={deleteFilialAction} id={row.id_filial} />
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
                data={filiais}
                responsive
                pagination
                customStyles={customStyles}
                noDataComponent={<div>Nenhuma filial cadastrada</div>}
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

export default ManageFilialDataTable;
