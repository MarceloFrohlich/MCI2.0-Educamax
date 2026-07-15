import ActiveMciBars from "../components/Dashboard/graphs/activeMCIs"
import CircularGraph from "../components/Dashboard/graphs/circularGraph"
import ProgressBar from "../components/Dashboard/graphs/progressBar"
import WeeklyProgress from "../components/Dashboard/graphs/weeklyProgress"
import MciEvolutionChart from "../components/Dashboard/graphs/MCIEvolutionChart"
import DirectionIndicatorsChart from "../components/Dashboard/graphs/directionIndicatorsGraph"
import AlertsWarning from "../components/Dashboard/alertsWarning"
import Score from "../components/Dashboard/score"
import ExpandableGraph from "../components/Dashboard/expandableGraph"
import InfoTooltip from "../components/utils/infoTooltip"
import { getDashboard } from "../actions/dashboard/dashboard"

const infos = {
    progresso: "Mostra quanto da meta desta semana já foi realizado: a soma de tudo que foi lançado na semana dividida pela soma das metas semanais de todos os placares ativos. As barrinhas indicam em que dia da semana os lançamentos foram feitos, com o marcador HOJE no dia atual. A semana do painel vai de domingo a sábado.",
    onTrack: "Percentual de placares que estão no ritmo certo. Um placar está on track quando o realizado acumulado é maior ou igual ao previsto até hoje (meta semanal × semanas decorridas). A variação no topo compara com a mesma medição feita na semana passada: positiva significa que mais placares entraram no ritmo.",
    mcisAtivas: "Jogos (MCIs) com período em andamento. Cada barra mostra o percentual da meta total já realizado. A cor indica o ritmo: verde = no ritmo (realizado ≥ previsto até hoje), laranja = atrás, mas acima de 70% do previsto, amarelo = abaixo de 70% do previsto. Use as setas ou role a lista para ver todas.",
    compromissos: "Percentual de compromissos semanais cumpridos. Ao lançar a semana, a equipe registra o valor que se compromete a realizar na semana seguinte; o compromisso é cumprido quando o lançamento seguinte realiza pelo menos o prometido. Só entram no cálculo compromissos que já puderam ser avaliados.",
    engajamento: "Nota de 0 a 10 para a disciplina de registro: a proporção de placares ativos que receberam lançamento na semana corrente. Mede assiduidade (a equipe registrou?), enquanto o MCI On Tracks mede resultado (a equipe entregou?). A variação compara com a semana passada.",
    evolucaoLinha: "Trajetória Meta × Atual ao longo das semanas, em percentual da meta total. A linha Meta cresce de forma linear até 100% no fim do período; a linha Atual é o realizado acumulado médio do seu escopo e para na semana corrente — o espaço entre as duas linhas mostra o quanto a execução está adiantada ou atrasada.",
    evolucaoBarras: "Meta × Resultado das unidades diretamente abaixo do seu perfil: franqueadora vê filiais, filial vê equipes e equipe vê seus jogos. Os valores são percentuais da meta total: a barra escura é quanto a unidade deveria ter atingido até hoje e a amarela é quanto realmente atingiu. Amarela acima da escura = unidade adiantada.",
    alertas: "Avisos gerados automaticamente: equipe em risco (abaixo da meta por 3 semanas consecutivas), atualização pendente (sem lançamento na semana corrente), nova MCI criada (últimos 7 dias) e meta atingida antes do prazo.",
}

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
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px] flex justify-between items-center">Progresso<InfoTooltip texto={infos.progresso} /></h1>
                            <div className="flex justify-center gap-4 items-center mt-1">
                                <p className="text-4xl">{progresso}%</p>
                                <p className="text-[12.5px] font-semibold leading-3.5">Falta {faltaSemana}% para concluir a semana</p>
                            </div>
                            <WeeklyProgress dias={dashboard.progresso_semana.dias} />

                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px] flex justify-between items-center">MCI On Tracks<InfoTooltip texto={infos.onTrack} /></h1>
                            <p className="text-[12px] text-center leading-3 mt-1"><span className="font-semibold text-(--textYellowColor)">{formatVariacao(dashboard.on_track.variacao)}</span> do que a <span className="font-semibold text-(--textYellowColor)">semana passada</span></p>
                            <div className="h-40">
                                <ExpandableGraph titulo="MCI On Tracks">
                                    <CircularGraph value={Math.round(dashboard.on_track.percentual)} />
                                </ExpandableGraph>
                            </div>

                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px] flex justify-between items-center">MCIs Ativas<InfoTooltip texto={infos.mcisAtivas} /></h1>
                            <p className="text-[12px] text-center leading-3 mt-1"><span className="font-semibold text-(--textYellowColor)">{dashboard.mcis.ativas} MCIs</span> ativas com {dashboard.mcis.concluidas} concluída{dashboard.mcis.concluidas === 1 ? '' : 's'}</p>
                            <ActiveMciBars lista={dashboard.mcis.lista} />
                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px] flex justify-between items-center">Compromissos<InfoTooltip texto={infos.compromissos} posicao="direita" /></h1>
                            <div className="mt-1">
                                <p className="text-[12px] text-center leading-3"><span className="font-semibold text-(--textYellowColor)">{formatVariacao(dashboard.compromissos.variacao)}</span> do que a semana passada</p>
                                <p className="text-[12px] text-center leading-3"><span className="font-semibold text-(--textYellowColor)">{dashboard.compromissos.concluidos_nesta_semana} compromisso{dashboard.compromissos.concluidos_nesta_semana === 1 ? ' concluido' : 's concluidos'}</span> nesta semana</p>
                            </div>
                            <div className="h-40">
                                <ExpandableGraph titulo="Compromissos">
                                    <CircularGraph value={Math.round(dashboard.compromissos.percentual)} />
                                </ExpandableGraph>
                            </div>
                        </div>
                    </div>
                    <div className="h-72 flex gap-6">
                        <div className="w-1/2 rounded-4xl bg-[#F0F4F9] h-full px-6 py-2 shadow-xl">
                            <div className="flex justify-between mb-4">
                                <h1 className="font-semibold text-(--textBaseColor) text-[14px] w-full flex justify-between items-center">Evolução das MCIs<InfoTooltip texto={infos.evolucaoLinha} /></h1>
                            </div>
                            <ExpandableGraph
                                titulo="Evolução das MCIs — Meta × Atual por semana"
                                expandido={<MciEvolutionChart data={evolucao} graphHeight="h-[85%]" />}
                            >
                                <MciEvolutionChart data={evolucao} />
                            </ExpandableGraph>
                        </div>
                        <div className="w-1/2 rounded-4xl bg-[#F0F4F9] h-full px-6 py-2 shadow-xl flex flex-col">
                            <h1 className="font-semibold text-[14px] mb-2 flex justify-between items-center">
                                Evolução das MCIs<InfoTooltip texto={infos.evolucaoBarras} posicao="direita" />
                            </h1>

                            <div className="flex-1 min-h-0">
                                <ExpandableGraph titulo="Evolução das MCIs — Meta × Resultado por unidade">
                                    <DirectionIndicatorsChart unidades={dashboard.evolucao_unidades} />
                                </ExpandableGraph>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="h-134 flex flex-col gap-4 ">
                        <div className="h-1/4 bg-[#F0F4F9] rounded-4xl shadow-xl px-6 py-2">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px] flex justify-between items-center">Engajamento Total<InfoTooltip texto={infos.engajamento} posicao="direita" /></h1>
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
                                <h1 className="font-semibold text-(--textBaseColor) text-[14px] flex justify-between items-center">
                                    Alertas & Avisos<InfoTooltip texto={infos.alertas} posicao="direita" />
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
