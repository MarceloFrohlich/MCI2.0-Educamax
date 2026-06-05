import { useMemo, useState } from "react"
import { Button } from "../../../components/ui/button"
import { IPrevidencia } from "../../types/centralMCI/centralMCI"
import MciEvolutionChart from "../Dashboard/graphs/MCIEvolutionChart"
import { formatDateBR, mapPrevidenciaToEvolutionChart, weeklyActivitiesCount } from "../utils/general"

interface IMeasureGraphsProps {
    previdencias: IPrevidencia[]
}

const MeasureGraphs: React.FC<IMeasureGraphsProps> = ({ previdencias }) => {
    const [selectedMedida, setSelectedMedida] = useState<IPrevidencia | null>(null)

    const data = useMemo(() => {
        if (!selectedMedida) return [];

        return mapPrevidenciaToEvolutionChart(selectedMedida);
    }, [selectedMedida]);

    return (
        <div className="flex flex-col items-center gap-4 mb-4">

            <div className="flex gap-4 w-full justify-center">
                {previdencias.map((previdencia, index) => (
                    <Button
                        key={previdencia.id_previdencia}
                        type="button"
                        className="hover:cursor-pointer"
                        onClick={() => setSelectedMedida(previdencia)}
                    >
                        Medida {index + 1}
                    </Button>
                ))}
            </div>
            {selectedMedida && (
                <div className="flex gap-4 w-full">
                    <div className="w-[60%] h-75">
                        <MciEvolutionChart data={data} graphHeight="h-75" />
                    </div>
                    <div className="h-75 shadow-xl border border-gray-400/20 rounded-lg flex-1 overflow-y-auto custom-scrollbar">
                        <p className="text-center text-sm mt-2">Resultados Analíticos</p>
                        <p className="text-center text-sm mt-2">Quantidade de atividades semanais: {selectedMedida ? weeklyActivitiesCount(selectedMedida).toFixed(2) : 0}</p>
                        <div className="flex flex-col gap-2 px-4">
                            <p className="text-sm mt-4">Resultados Semanais:</p>
                            <ul>
                                {selectedMedida.semanas
                                    .filter(semana => semana.lancamento?.realizado)
                                    .map(semana => (
                                        <li key={semana.lancamento.id_atualizacao} className="text-sm">
                                            {formatDateBR(semana.data_previsto_lancamento)}: {semana.lancamento.realizado}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default MeasureGraphs