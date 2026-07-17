'use client'

import { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ILog } from "../../types/logs/logs";
import { customStyles } from "../utils/general";

const selectClasses = `
    bg-white
    rounded-xl
    py-2
    px-4
    focus:outline-none
    transition-colors
    border-2
    border-(--textBaseColor)/50
    text-(--textBaseColor)
`;

const LogsDataTable: React.FC<{ logs: ILog[] }> = ({ logs }) => {
    const [metodo, setMetodo] = useState("");
    const [resultado, setResultado] = useState("");
    const [rota, setRota] = useState("");

    const logsFiltrados = useMemo(() => {
        return logs.filter(log => {
            if (metodo && log.metodo !== metodo) return false;
            if (resultado && String(log.sucesso) !== resultado) return false;
            if (rota && !log.rota.toLowerCase().includes(rota.toLowerCase())) return false;
            return true;
        });
    }, [logs, metodo, resultado, rota]);

    const columns: TableColumn<ILog>[] = [
        {
            name: "Data",
            selector: (row) => row.data_hora,
            sortable: true,
            cell: (row) => new Date(row.data_hora).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
            }),
            grow: 1,
        },
        {
            name: "Método",
            selector: (row) => row.metodo,
            sortable: true,
            cell: (row) => row.metodo,
            grow: 0.6,
        },
        {
            name: "Rota",
            selector: (row) => row.rota,
            sortable: true,
            cell: (row) => row.rota,
            grow: 1.5,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => row.status,
            grow: 0.5,
        },
        {
            name: "Resultado",
            selector: (row) => String(row.sucesso),
            sortable: true,

            cell: (row) => (
                <span className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${row.sucesso
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}
                `}>
                    {row.sucesso ? "Sucesso" : "Erro"}
                </span>
            ),

            grow: 0.7,
        },
        {
            name: "Usuário",
            selector: (row) => row.usuario ?? "-",
            sortable: true,
            cell: (row) => row.usuario ?? "-",
            grow: 1.2,
        },
        {
            name: "Mensagem",
            selector: (row) => row.mensagem_erro ?? "-",

            cell: (row) => (
                <span title={row.mensagem_erro ?? undefined} className="py-2">
                    {row.mensagem_erro ?? "-"}
                </span>
            ),

            grow: 2,
            wrap: true,
        },
    ];

    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-wrap gap-4">
                <select
                    value={metodo}
                    onChange={(e) => setMetodo(e.target.value)}
                    className={selectClasses}
                >
                    <option value="">Todos os métodos</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                    <option value="GET">GET</option>
                </select>

                <select
                    value={resultado}
                    onChange={(e) => setResultado(e.target.value)}
                    className={selectClasses}
                >
                    <option value="">Sucesso e erro</option>
                    <option value="true">Somente sucesso</option>
                    <option value="false">Somente erro</option>
                </select>

                <input
                    type="text"
                    value={rota}
                    onChange={(e) => setRota(e.target.value)}
                    placeholder="Filtrar por rota"
                    className={`${selectClasses} placeholder:text-slate-400`}
                />
            </div>

            <div className="w-full max-h-[80vh] rounded-lg shadow-[0_10px_35px_rgba(93,120,183,0.22)]">
                <DataTable
                    columns={columns}
                    data={logsFiltrados}
                    responsive
                    pagination
                    customStyles={customStyles}
                    noDataComponent={<div>Nenhum log registrado</div>}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 25, 50]}

                    paginationComponentOptions={{
                        rowsPerPageText: "Linhas por página:",
                        rangeSeparatorText: "de",
                        noRowsPerPage: false,
                        selectAllRowsItem: false,
                        selectAllRowsItemText: "Selecionar todos",
                    }}
                />
            </div>

        </div>
    );
};

export default LogsDataTable;
