'use client'

import { useEffect, useState } from "react";
import { IoFootballOutline } from "react-icons/io5";
import { ICup } from "../../types/centralMCI/centralMCI"
import { getRelatorios } from "../../actions/relatorios/relatorios";
import { IRelatorio } from "../../types/relatorios/relatorios";
import { formatDateBR } from "../utils/general";
import PrevidenciaProgress from "./previdenciaProgress";

interface ICupFilter {
    copas: ICup[]
}

const Reports: React.FC<ICupFilter> = ({ copas }) => {

    const [reports, setReports] = useState<IRelatorio[]>([]);

    const [idCopa, setIdCopa] = useState<string>('')

    useEffect(() => {
        if (!idCopa) {
            setReports([]);
            return;
        }

        fetchReports();
    }, [idCopa]);

    const fetchReports = async () => {
        const relatorios = await getRelatorios(idCopa);
        if (relatorios) {
            setReports(relatorios);
        }
    };

    return (
        <section className="flex flex-col gap-8">
            <div className="flex gap-4 mt-4 items-center flex-1 z-20">
                <label
                    htmlFor="copas"
                    className="text-sm font-medium text-gray-700"
                >
                    Filtrar por Copa
                </label>
                <select
                    onChange={(e) => setIdCopa(e.target.value)}
                    className="
                        bg-white
                        w-full min-w-0 max-w-full md:w-auto md:min-w-1/4
                        rounded-xl
                        py-2
                        px-4
                        focus:outline-none
                        transition-colors
                        border-2
                        border-(--textBaseColor)/50
                        text-(--textBaseColor)
                    ">
                    <option value=''>Selecione</option>
                    {copas && copas.map((copa: ICup) => (
                        <option key={copa.id_copa} value={copa.id_copa}>{`${copa.departamento.nome} - ${copa.nome}`}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-4">

                <h1 className="font-bold text-xl">
                    Relatório consolidado
                    {idCopa && copas && (
                        <span className="text-[#5D78B7]">
                            {': '}
                            {(() => {
                                const copa = copas.find(c => c.id_copa === idCopa)
                                return copa ? `${copa.departamento.nome} - ${copa.nome}` : ''
                            })()}
                        </span>
                    )}
                </h1>

                {reports.length === 0 && (
                    <span className="text-sm text-[#969696] font-medium">
                        Selecione uma copa para visualizar os relatórios.
                    </span>
                )}

                {reports && reports.map(report => (

                    <div
                        key={report.id_jogo}
                        className="
                            bg-[#F5F5F5]
                            rounded-xl
                            border-l-4
                            border-[#5D78B7]
                            shadow-sm
                            px-4
                            py-3
                            flex
                            flex-col
                            gap-2
                        "
                    >

                        <div className="flex items-center gap-2">

                            <IoFootballOutline className="size-5 text-[#5D78B7] shrink-0" />

                            <h2 className="text-sm font-bold text-[#17233C]">
                                MCI {report.verbo} {report.medida} de {report.de} para {report.para} até {formatDateBR(report.data_fim)}
                            </h2>

                        </div>

                        {report.previdencias && report.previdencias.length > 0 && (

                            <div className="flex flex-col gap-1.5">

                                {report.previdencias.map(previdencia => (
                                    <PrevidenciaProgress
                                        key={previdencia.id_previdencia}
                                        previdencia={previdencia}
                                    />
                                ))}

                            </div>

                        )}

                    </div>

                ))}

            </div>
        </section>

    )
}

export default Reports
