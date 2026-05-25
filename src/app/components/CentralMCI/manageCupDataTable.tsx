"use client";

import React from "react";
import DataTable from "react-data-table-component";
import CreateEditLeaderModal from "./createEditLeaderModal";
import { ICup } from "../../types/centralMCI/centralMCI";
import { cups, leaders } from "../../mocks/mocks";
import DeleteModal from "../utils/deleteModal";
import CreateEditCupModal from "./createEditCupModal";

const ManageCupDataTable: React.FC = ({
}) => {

    const data:ICup[] = cups

    const columns = [
        {
            name: "Nome",
            selector: (row: ICup) => row.nome,
            sortable: true,
            cell: (row: ICup) => row.nome,
            grow: 1.5,
        },
        {
            name: "Lider",
            selector: (row: ICup) => row.lider.nome,
            sortable: true,
            cell: (row: ICup) => row.nome,
            grow: 1,
        },
        {
            name: "Verbo",
            selector: (row: ICup) => row.verbo,
            sortable: true,
            cell: (row: ICup) => row.verbo,
            grow: 1,
        },
        {
            name: "Medida",
            selector: (row: ICup) => row.medida,
            sortable: true,
            cell: (row: ICup) => row.medida,
            grow: 1,
        },
        {
            name: "De",
            selector: (row: ICup) => row.de,
            sortable: true,
            cell: (row: ICup) => row.de,
            grow: 1,
        },
        {
            name: "Para",
            selector: (row: ICup) => row.para,
            sortable: true,
            cell: (row: ICup) => row.para,
            grow: 1,
        },
        {
            name: "Início",
            selector: (row: ICup) => row.inicio,
            sortable: true,
            cell: (row: ICup) => row.inicio,
            grow: 1,
        },
        {
            name: "Fim",
            selector: (row: ICup) => row.fim,
            sortable: true,
            cell: (row: ICup) => row.fim,
            grow: 1,
        },

        {
            name: "Ações",
            cell: (row: ICup) => {
                return <div className="flex">
                    <CreateEditCupModal isEditMode={true} cupData={row} leaders={leaders} />
                    <DeleteModal onConfirm={() => alert('clicou no delete')} />
                </div>;
            },
            right: true,
            grow: 1,
        },
    ];

    return (
        <DataTable
            title={
            <div className="w-full flex justify-end">
                <CreateEditCupModal leaders={leaders}/>
            </div>}
            columns={columns}
            data={data}
            responsive
            pagination
            noDataComponent={<div>Nenhum líder cadastrado</div>}
            paginationPerPage={8}
            paginationRowsPerPageOptions={[5, 8]}
            paginationComponentOptions={{
                rowsPerPageText: "Linhas por página:",
                rangeSeparatorText: "de",
                noRowsPerPage: false,
                selectAllRowsItem: false,
                selectAllRowsItemText: "Selecionar todos",
            }}

        />
    );
};

export default ManageCupDataTable;
