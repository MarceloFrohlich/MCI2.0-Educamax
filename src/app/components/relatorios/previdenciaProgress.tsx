'use client'

import { IPrevidencia } from "../../types/centralMCI/centralMCI";
import { formatDateBR } from "../utils/general";

interface IPrevidenciaProgressProps {
    previdencia: IPrevidencia
    apenasAnual?: boolean
}

interface IProgressBarProps {
    label: string
    percent: number
    fillColor: string
    trackColor: string
}

const ProgressBar: React.FC<IProgressBarProps> = ({
    label,
    percent,
    fillColor,
    trackColor
}) => {

    return (
        <div
            className="
                relative
                h-5.5
                w-full
                sm:w-60
                rounded-full
                overflow-hidden
            "
            style={{ backgroundColor: trackColor }}
        >

            <div
                className="
                    absolute
                    inset-y-0
                    left-0
                    transition-all
                    duration-500
                "
                style={{
                    width: `${Math.min(Math.max(percent, 0), 100)}%`,
                    backgroundColor: fillColor,
                }}
            />

            <span
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-[11px]
                    font-bold
                    text-white
                    uppercase
                    tracking-wide
                    drop-shadow-sm
                "
            >
                {label}: {percent.toFixed(0)}%
            </span>

        </div>
    );

};

const PrevidenciaProgress: React.FC<
    IPrevidenciaProgressProps
> = ({ previdencia, apenasAnual = false }) => {

    const meta =
        previdencia.placar_desejado - previdencia.placar_inicial;

    const realizado =
        previdencia.placar_atual - previdencia.placar_inicial;

    const progressoAnual = meta !== 0
        ? (realizado / meta) * 100
        : 0;

    const inicio = new Date(previdencia.data_inicio).getTime();
    const fim = new Date(previdencia.data_fim).getTime();
    const hoje = Date.now();

    const fracaoDecorrida = fim > inicio
        ? Math.min(Math.max((hoje - inicio) / (fim - inicio), 0), 1)
        : 1;

    const esperadoHoje = meta * fracaoDecorrida;

    const progressoAtual = esperadoHoje !== 0
        ? (realizado / esperadoHoje) * 100
        : (realizado !== 0 ? 100 : 0);

    return (
        <div
            className="
                bg-[#ECECEC]
                rounded-lg
                px-4
                py-2
                flex
                flex-wrap
                items-center
                justify-between
                gap-x-6
                gap-y-2
            "
        >

            <span className="text-sm text-[#17233C] min-w-0">
                <span className="font-bold capitalize">
                    {previdencia.verbo}
                    {' '}
                    {previdencia.placar_desejado}
                    {' '}
                    {previdencia.unidade_medida}
                </span>
                {' '}
                até {formatDateBR(previdencia.data_fim)}
                {' - '}
                Placar Atual: {previdencia.placar_atual}
            </span>

            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    flex-1
                    sm:flex-none
                "
            >

                {!apenasAnual && (
                    <ProgressBar
                        label="Atual"
                        percent={progressoAtual}
                        fillColor="#2FA84F"
                        trackColor="#C94F4F"
                    />
                )}

                <ProgressBar
                    label="Anual"
                    percent={progressoAnual}
                    fillColor={apenasAnual ? "#2FA84F" : "#5D78B7"}
                    trackColor={apenasAnual ? "#C94F4F" : "#C6CFD9"}
                />

            </div>

        </div>
    );

};

export default PrevidenciaProgress;
