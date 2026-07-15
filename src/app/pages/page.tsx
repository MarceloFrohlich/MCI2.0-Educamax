import ActiveMciBars from "../components/Dashboard/graphs/activeMCIs"
import CircularGraph from "../components/Dashboard/graphs/circularGraph"
import ProgressBar from "../components/Dashboard/graphs/progressBar"
import WeeklyProgress from "../components/Dashboard/graphs/weeklyProgress"
import MciEvolutionChart from "../components/Dashboard/graphs/MCIEvolutionChart"
import DirectionIndicatorsChart from "../components/Dashboard/graphs/directionIndicatorsGraph"
import AlertsWarning from "../components/Dashboard/alertsWarning"
import Score from "../components/Dashboard/score"
import { getDashboard } from "../actions/dashboard/dashboard"

const formatVariacao = (valor: number) => `${valor >= 0 ? '+' : ''}${valor}%`

const imagemRanking = (posicao: number) =>
    posicao <= 2 ? 'trophy' : posicao === 3 ? 'star' : 'other'

const Dashboard = async () => {
    const dashboard = await getDashboard()

    const progresso = Math.round(dashboard.progresso_semana.percentual)
    const faltaSemana = Math.max(100 - progresso, 0)

    const evolucao = dashboard.evolucao_semanal.map(item => ({
        week: `Sem ${item.semana}`,
        meta: item.meta,
        atual: item.atual,
    }))

    // último realizado registrado = progresso geral da execução
    const execucaoGeral = [...dashboard.evolucao_semanal].reverse().find(item => item.atual !== null)?.atual ?? 0

    return (
        <section className="mx-8 text-(--textBaseColor)">

            <header className="w-full flex justify-between items-end mb-4">
                <div className="w-1/8 text-(--textBaseColor)">Visão executiva da execução estratégica</div>
                <ProgressBar value={`${Math.min(Math.round(execucaoGeral), 100)}%`} />
                <div className="flex gap-8 text-(--textBaseColor)">
                    <p>{progresso}% PROG</p>
                    <p>{Math.round(dashboard.on_track.percentual)}% MCI</p>
                    <p>{dashboard.mcis.ativas} MCI</p>
                    <p>{formatVariacao(dashboard.compromissos.variacao)} COMP</p>
                    <p>{dashboard.engajamento.nota} NOTA</p>
                </div>
            </header>

            <div className="flex justify-between gap-6">
                <div className="w-[70%] flex flex-col gap-4">
                    <div className="h-58 flex gap-6">
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Progresso</h1>
                            <div className="flex justify-center gap-4 items-center mt-1">
                                <p className="text-4xl">{progresso}%</p>
                                <p className="text-[12.5px] font-semibold leading-3.5">Falta {faltaSemana}% para concluir a semana</p>
                            </div>
                            <WeeklyProgress dias={dashboard.progresso_semana.dias} />

                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">MCI On Tracks</h1>
                            <p className="text-[12px] text-center leading-3 mt-1"><span className="font-semibold text-(--textYellowColor)">{formatVariacao(dashboard.on_track.variacao)}</span> do que a <span className="font-semibold text-(--textYellowColor)">semana passada</span></p>
                            <div className="h-40">
                                <CircularGraph value={Math.round(dashboard.on_track.percentual)} />
                            </div>

                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">MCIs Ativas</h1>
                            <p className="text-[12px] text-center leading-3 mt-1"><span className="font-semibold text-(--textYellowColor)">{dashboard.mcis.ativas} MCIs</span> ativas com {dashboard.mcis.concluidas} concluída{dashboard.mcis.concluidas === 1 ? '' : 's'}</p>
                            <ActiveMciBars lista={dashboard.mcis.lista} />
                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Compromissos</h1>
                            <div className="mt-1">
                                <p className="text-[12px] text-center leading-3"><span className="font-semibold text-(--textYellowColor)">{formatVariacao(dashboard.compromissos.variacao)}</span> do que a semana passada</p>
                                <p className="text-[12px] text-center leading-3"><span className="font-semibold text-(--textYellowColor)">{dashboard.compromissos.concluidos_nesta_semana} compromisso{dashboard.compromissos.concluidos_nesta_semana === 1 ? ' concluido' : 's concluidos'}</span> nesta semana</p>
                            </div>
                            <div className="h-40">
                                <CircularGraph value={Math.round(dashboard.compromissos.percentual)} />
                            </div>
                        </div>
                    </div>
                    <div className="h-72 flex gap-6">
                        <div className="w-1/2 rounded-4xl bg-[#F0F4F9] h-full px-6 py-2 shadow-xl">
                            <div className="flex justify-between mb-4">
                                <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Evolução das MCIs</h1>
                            </div>
                            <MciEvolutionChart data={evolucao} />
                        </div>
                        <div className="w-1/2 rounded-4xl bg-[#F0F4F9] h-full px-6 py-2 shadow-xl flex flex-col">
                            <h1 className="font-semibold text-[14px] mb-2">
                                Evolução das MCIs
                            </h1>

                            <div className="flex-1">
                                <DirectionIndicatorsChart unidades={dashboard.evolucao_unidades} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="h-134 flex flex-col gap-4 ">
                        <div className="h-1/4 bg-[#F0F4F9] rounded-4xl shadow-xl px-6 py-2">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Engajamento Total</h1>
                            <div className="flex justify-center items-end gap-12 mt-4 mb-2">
                                <p className="text-4xl">{dashboard.engajamento.nota}</p>
                                <p className="text-[12px] text-left leading-3"><span className="font-semibold text-(--textYellowColor)">{formatVariacao(dashboard.engajamento.variacao)} </span> do que a <br /> semana passada</p>
                            </div>
                            <div className="flex-1">
                                <ProgressBar value={`${Math.min(Math.round(dashboard.engajamento.nota * 10), 100)}%`} />
                            </div>

                        </div>
                        <div className="h-full rounded-4xl bg-[#F0F4F9] shadow-xl flex flex-col overflow-hidden">
                            <div className="px-6 py-4">
                                <h1 className="font-semibold text-(--textBaseColor) text-[14px]">
                                    Alertas & Avisos
                                </h1>
                            </div>
                            <div className="relative flex-1 overflow-y-auto px-6 pb-6 custom-scroll">
                                <AlertsWarning alertas={dashboard.alertas} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4 flex flex-col gap-4">
                {dashboard.ranking.map(equipe => (
                    <Score
                        key={equipe.posicao}
                        description={`${equipe.percentual}% de desempenho`}
                        initial={equipe.sigla}
                        number={equipe.posicao}
                        title={equipe.nome}
                        image={imagemRanking(equipe.posicao)}
                    />
                ))}

            </div>

        </section>
    )
}

export default Dashboard
