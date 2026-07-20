'use client'

import { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ILog } from "../../types/logs/logs";
import { customStyles } from "../utils/general";
import FilterCard from "../utils/filterCard";

const LogPayload: React.FC<{ data: ILog }> = ({ data }) => {
    if (!data.payload) return null;

    return (
        <pre className="mx-4 my-2 max-h-80 overflow-auto rounded-md bg-slate-900 p-4 text-xs text-slate-100">
            {JSON.stringify(data.payload, null, 2)}
        </pre>
    );
};

const LogsDataTable: React.FC<{ logs: ILog[] }> = ({ logs }) => {
    const [filters, setFilters] = useState({
        metodo: '',
        resultado: '',
        rota: '',
        dataInicio: '',
        dataFim: ''
    });

    const handleFilterChange = (param: string, value: string) => {
        setFilters(prev => ({ ...prev, [param]: value }));
    };

    const logsFiltrados = useMemo(() => {
        const inicio = filters.dataInicio ? new Date(`${filters.dataInicio}T00:00:00`) : null;
        const fim = filters.dataFim ? new Date(`${filters.dataFim}T23:59:59.999`) : null;

        return logs.filter(log => {
            if (filters.metodo && log.metodo !== filters.metodo) return false;
            if (filters.resultado && String(log.sucesso) !== filters.resultado) return false;
            if (filters.rota && !log.rota.toLowerCase().includes(filters.rota.toLowerCase())) return false;

            const dataLog = new Date(log.data_hora);
            if (inicio && dataLog < inicio) return false;
            if (fim && dataLog > fim) return false;

            return true;
        });
    }, [logs, filters]);

    const columns: TableColumn<ILog>[] = [
        {
            name: "Data",
            selector: (row) => row.data_hora,
            sortable: true,
            cell: (row) => new Date(row.data_hora).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
                timeZone: "America/Sao_Paulo",
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
                <FilterCard
                    param="rota"
                    title="PESQUISAR POR ROTA"
                    value={filters.rota}
                    onChange={handleFilterChange}
                />

                <FilterCard
                    param="metodo"
                    type="select"
                    title="MÉTODO"
                    value={filters.metodo}
                    options={[
                        { value: 'POST', label: 'POST' },
                        { value: 'PUT', label: 'PUT' },
                        { value: 'PATCH', label: 'PATCH' },
                        { value: 'DELETE', label: 'DELETE' },
                    ]}
                    onChange={handleFilterChange}
                />

                <FilterCard
                    param="resultado"
                    type="select"
                    title="RESULTADO"
                    value={filters.resultado}
                    options={[
                        { value: 'true', label: 'Sucesso' },
                        { value: 'false', label: 'Erro' },
                    ]}
                    onChange={handleFilterChange}
                />

                <FilterCard
                    param="dataInicio"
                    type="date"
                    title="DATA INÍCIO"
                    value={filters.dataInicio}
                    onChange={handleFilterChange}
                />

                <FilterCard
                    param="dataFim"
                    type="date"
                    title="DATA FIM"
                    value={filters.dataFim}
                    onChange={handleFilterChange}
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
                    expandableRows
                    expandableRowsComponent={LogPayload}
                    expandableRowDisabled={(row) => !row.payload}
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
