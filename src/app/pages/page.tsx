import ActiveMciBars from "../components/Dashboard/graphs/activeMCIs"
import CircularGraph from "../components/Dashboard/graphs/circularGraph"
import ProgressBar from "../components/Dashboard/graphs/progressBar"
import WeeklyProgress from "../components/Dashboard/graphs/weeklyProgress"
import MciEvolutionChart from "../components/Dashboard/graphs/MCIEvolutionChart"
import DirectionIndicatorsChart from "../components/Dashboard/graphs/directionIndicatorsGraph"
import AlertsWarning from "../components/Dashboard/alertsWarning"
import Score from "../components/Dashboard/score"
import { scores } from "../mocks/mocks"

const Dashboard: React.FC = () => {
    return (
        <section className="mx-8 text-(--textBaseColor)">

            <header className="w-full flex justify-between items-end mb-4">
                <div className="w-1/8 text-(--textBaseColor)">Visão executiva da execução estratégica</div>
                <ProgressBar value="75%" />
                <div className="flex gap-8 text-(--textBaseColor)">
                    <p>12% PROG</p>
                    <p>78% MCI</p>
                    <p>8 MCI</p>
                    <p>-5% COMP</p>
                    <p>7.8 NOTA</p>
                </div>
            </header>

            <div className="flex justify-between gap-6">
                <div className="w-[70%] flex flex-col gap-4">
                    <div className="h-58 flex gap-6">
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Progresso</h1>
                            <div className="flex justify-center gap-4 items-center mt-1">
                                <p className="text-4xl">12%</p>
                                <p className="text-[12.5px] font-semibold leading-3.5">Falta 88% para concluir a semana</p>
                            </div>
                            <WeeklyProgress />

                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">MCI On Tracks</h1>
                            <p className="text-[12px] text-center leading-3 mt-1">Mais de <span className="font-semibold text-(--textYellowColor)">12%</span> do que a <span className="font-semibold text-(--textYellowColor)">semana passada</span></p>
                            <div className="h-40">
                                <CircularGraph value={78} />
                            </div>

                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">MCIs Ativas</h1>
                            <p className="text-[12px] text-center leading-3 mt-1">Mais de <span className="font-semibold text-(--textYellowColor)">8 MCIs</span> ativas com duas concluidas</p>
                            <ActiveMciBars />
                        </div>
                        <div className="w-1/4 bg-[#F0F4F9] h-full shadow-xl px-6 py-2 rounded-4xl">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Compromissos</h1>
                            <div className="mt-1">
                                <p className="text-[12px] text-center leading-3"><span className="font-semibold text-(--textYellowColor)">-5%</span> do que a semana passada</p>
                                <p className="text-[12px] text-center leading-3"><span className="font-semibold text-(--textYellowColor)">2 compromissos concluidos</span> nesta semana</p>
                            </div>
                            <div className="h-40">
                                <CircularGraph value={70} />
                            </div>
                        </div>
                    </div>
                    <div className="h-72 flex gap-6">
                        <div className="w-1/2 rounded-4xl bg-[#F0F4F9] h-full px-6 py-2 shadow-xl">
                            <div className="flex justify-between mb-4">
                                <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Evolução das MCIs</h1>
                                <select className="border px-4">
                                    <option value=''>Semana</option>
                                    <option value='1'>1 Semana</option>
                                    <option value='2'>2 Semana</option>
                                    <option value='3'>3 Semana</option>
                                </select>
                            </div>
                            <MciEvolutionChart />
                        </div>
                        <div className="w-1/2 rounded-4xl bg-[#F0F4F9] h-full px-6 py-2 shadow-xl flex flex-col">
                            <h1 className="font-semibold text-[14px] mb-2">
                                Evolução das MCIs
                            </h1>

                            <div className="flex-1">
                                <DirectionIndicatorsChart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="h-134 flex flex-col gap-4 ">
                        <div className="h-1/4 bg-[#F0F4F9] rounded-4xl shadow-xl px-6 py-2">
                            <h1 className="font-semibold text-(--textBaseColor) text-[14px]">Engajamento Total</h1>
                            <div className="flex justify-center items-end gap-12 mt-4 mb-2">
                                <p className="text-4xl">7.8</p>
                                <p className="text-[12px] text-left leading-3"><span className="font-semibold text-(--textYellowColor)">+8% </span> do que a <br /> semana passada</p>
                            </div>
                            <div className="flex-1">
                                <ProgressBar value="78%" />
                            </div>

                        </div>
                        <div className="h-full rounded-4xl bg-[#F0F4F9] shadow-xl flex flex-col overflow-hidden">
                            <div className="px-6 py-4">
                                <h1 className="font-semibold text-(--textBaseColor) text-[14px]">
                                    Alertas & Avisos
                                </h1>
                            </div>
                            <div className="relative flex-1 overflow-y-auto px-6 pb-6 custom-scroll">
                                <AlertsWarning />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4 flex flex-col gap-4">
                {scores && scores.map(score => (
                    <Score
                        key={score.id}
                        description={score.description}
                        initial={score.initial}
                        number={score.id}
                        title={score.title}
                        image={score.image}
                    />
                ))}

            </div>

        </section>
    )
}

export default Dashboard