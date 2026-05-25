import DataTable from "react-data-table-component";
import { IFranqueadora } from "../../../types/cadastros/cadastros";
import { customStyles } from "../../../components/utils/general";
import DeleteModal from "../../../components/utils/deleteModal";
import { franqueadorasMock } from "../../../mocks/franqueadoras";
import CreateEditFranqueadoraModal from "./createEditFranqueadoraModal";

const ManageFranqueadorasDataTable: React.FC = ({
}) => {

    const data = franqueadorasMock

    const columns = [
        {
            name: "Nome",
            selector: (row: IFranqueadora) => row.nome,
            sortable: true,
            cell: (row: IFranqueadora) => row.nome,
            grow: 1.5,
        },
        {
            name: "Ações",
            cell: (row: IFranqueadora) => {
                return <div className="flex">
                    <CreateEditFranqueadoraModal isEditMode={true} franqueadoraData={row} />
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
                noDataComponent={<div>Nenhuma franqueadora cadastrada</div>}
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

export default ManageFranqueadorasDataTable;
