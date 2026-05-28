"use client";

import React from "react";
import DataTable from "react-data-table-component";
import { ICup, ILeader } from "../../types/centralMCI/centralMCI";
import DeleteModal from "../utils/deleteModal";
import CreateEditCupModal from "./createEditCupModal";
import { IDepartamento } from "../../types/cadastros/cadastros";
import { deleteCopaAction } from "../../actions/copas/copas";

interface IManageCupDataTable {
    leaders: ILeader[]
    departamentos: IDepartamento[]
    copas: ICup[]
}

const ManageCupDataTable: React.FC<IManageCupDataTable> = ({
    leaders, departamentos, copas
}) => {
    const columns = [
        {
            name: "Nome",
            selector: (row: ICup) => row.nome,
            sortable: true,
            cell: (row: ICup) => row.nome,
            grow: 1.5,
        },
        {
            name: "Departamento",
            selector: (row: ICup) => row.departamento.nome,
            sortable: true,
            cell: (row: ICup) => row.departamento.nome,
            grow: 1.5,
        },
        {
            name: "Lider",
            selector: (row: ICup) => row.lider.nome,
            sortable: true,
            cell: (row: ICup) => row.lider.nome,
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
            selector: (row: ICup) => row.ate,
            sortable: true,
            cell: (row: ICup) => row.ate,
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
                    <CreateEditCupModal
                        isEditMode={true}
                        cupData={row}
                        leaders={leaders}
                        departamentos={departamentos}
                    />
                    <DeleteModal action={deleteCopaAction} id={row.id_copa}  />
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
                    <CreateEditCupModal
                        departamentos={departamentos}
                        leaders={leaders} />
                </div>}
            columns={columns}
            data={copas}
            responsive
            pagination
            noDataComponent={<div>Nenhuma copa cadastrado</div>}
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
