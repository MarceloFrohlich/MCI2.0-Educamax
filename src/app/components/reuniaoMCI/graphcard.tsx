'use client'

import { IGame } from '../../types/centralMCI/centralMCI'
import { IMciEvolutionDataPoint } from '../../types/dashboard/dashboard'
import MciEvolutionChart from '../Dashboard/graphs/MCIEvolutionChart'
import { formatDateBR, mapPrevidenciaToEvolutionChart } from '../utils/general'

interface IScoreBoardCardProps {
    index: number
    game: IGame
}

const ScoreBoardCard: React.FC<IScoreBoardCardProps> = ({
    index,
    game
}) => {

    return (
        <section className="border-2 border-white shadow-2xl rounded-xl w-full flex flex-col gap-0">

            <div className="flex gap-3 items-center">
                <div className='m-1 rounded-full text-2xl h-10 w-10 border-2 border-(--colorVariantBlue) flex items-center justify-center text-(--primaryText) font-bold'>
                    {index}
                </div>
                <div>
                    <h1 className="font-bold text-md">{game.copa.departamento.nome}</h1>
                </div>
            </div>
            <div className="flex gap-4 justify-center w-full">
                <span className="font-bold">Jogo: {game.verbo} {game.medida} de {game.de} para {game.para} até {formatDateBR(game.data_fim)}</span>
            </div>
            {game.previdencias && game.previdencias.map((previdencia, index) => {
                const data: IMciEvolutionDataPoint[] = mapPrevidenciaToEvolutionChart(previdencia)

                const ultimoPonto = data
                    .filter(item => item.atual !== null)
                    .at(-1);

                const ondeEstou = ultimoPonto?.atual ?? 0;
                const ondeDeveriaEstar = ultimoPonto?.meta ?? 0;
                const ondeQueroChegar = previdencia.placar_desejado;

                return (
                    <div key={previdencia.id_previdencia} className='flex flex-col gap-4 mx-4 my-12'>
                        <div className='flex justify-around w-full'>
                            <span>Medida {index + 1}: {previdencia.verbo} {previdencia.unidade_medida} de {previdencia.placar_inicial} para {previdencia.placar_desejado} até {formatDateBR(game.data_fim)}</span>
                            <span>Líder: {game.lider?.nome}</span>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-4 justify-around w-full'>
                            <div className="w-full lg:w-[50%] gap-4 justify-center ">
                                <MciEvolutionChart data={data} graphHeight='h-80' />
                            </div>
                            <div className='w-full lg:w-[23%] border-2 flex flex-col justify-around border-white shadow-2xl p-4 rounded-xl'>
                                <div>
                                    <span className="font-bold text-lg">Relatar</span>
                                    <p className="text-sm ms-4">Realizado na última semana: {previdencia.atualizacoes.at(-1)?.placar_atual ?? '0'}</p>
                                </div>
                                <div>
                                    <span className="font-bold text-lg">Revisar Placar</span>
                                    <p className="text-sm ms-4">Onde estou: {ondeEstou}</p>
                                    <p className="text-sm ms-4">Onde deveria estar: {ondeDeveriaEstar}</p>
                                    <p className="text-sm ms-4">Onde quero chegar: {ondeQueroChegar}</p>
                                </div>
                                <div>
                                    <span className="font-bold text-lg">Planejamento</span>
                                    <p className="text-sm ms-4">Planejado para a próxima semana: {previdencia.atualizacoes.at(-1)?.compromisso ?? '0'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </section>
    )
}

export default ScoreBoardCard