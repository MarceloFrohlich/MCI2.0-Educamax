"use client";

import React from "react";
import DataTable from "react-data-table-component";
import { leaders } from "../../mocks/mocks";
import CreateEditLeaderModal from "./createEditLeaderModal";
import { ILeader } from "../../types/centralMCI/centralMCI";
import DeleteModal from "../utils/deleteModal";

const ManageLeaderDataTable: React.FC = ({
}) => {

    const data = leaders as ILeader[];

    const columns = [
        {
            name: "Nome",
            selector: (row: ILeader) => row.nome,
            sortable: true,
            cell: (row: ILeader) => row.nome,
            grow: 1.5,
        },
        {
            name: "Ações",
            cell: (row: ILeader) => {
                return <div className="flex">
                    <CreateEditLeaderModal isEditMode={true} leaderData={row} />
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
                <CreateEditLeaderModal />
            </div>}
            columns={columns}
            data={data}
            responsive
            pagination
            noDataComponent={<div>Nenhum líder cadastrado</div>}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 8, 10, 15]}
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

export default ManageLeaderDataTable;
