import { IPrevidencia } from "../../types/centralMCI/centralMCI";
import { IMciEvolutionDataPoint } from "../../types/dashboard/dashboard";

export const customStyles = {
    table: {
        style: {
            backgroundColor: '#DEE9EF',
            borderRadius: '0.5rem',
            overflow: 'hidden',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#DEE9EF',
            borderBottomWidth: '0px',
        },
    },
    rows: {
        style: {
            backgroundColor: '#DEE9EF',
            borderBottomWidth: '0px',
            minHeight: '50px',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#DEE9EF',
            borderTopWidth: '0px',
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
        },
    },
};

export function weeklyActivitiesCount(measure: IPrevidencia) {
    const semanas = measure.semanas.length;
    const atividadesTotal = measure.placar_desejado;

    return atividadesTotal / semanas;
}

export function formatDateBR(date: string): string {
    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
}

export function formatWeek(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}`;
}

export function mapPrevidenciaToEvolutionChart(previdencia: IPrevidencia) {
    const start = new Date(previdencia.data_inicio);
    const end = new Date(previdencia.data_fim);

    const weeks: string[] = [];

    const current = new Date(start);

    while (current <= end) {
        weeks.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 7);
    }

    const points = weeks.length;

    // 🔵 META (linha reta começando já na 1ª projeção)
    const step =
        (previdencia.placar_desejado - previdencia.placar_inicial) /
        (points - 1 || 1);

    const metaLine = Array.from({ length: points }, (_, i) => {
        const value =
            previdencia.placar_inicial + step * (i + 1); // 👈 começa na projeção da semana 1

        return {
            meta: Number(value.toFixed(2)),
        };
    });

    // 🟢 ATUAL (ACUMULADO POR SEMANA)
    const actualMap = new Map<number, number>();

    previdencia.atualizacoes.forEach(a => {
        const semana = a.numero_semana;

        actualMap.set(
            semana,
            (actualMap.get(semana) || 0) + a.placar_atual
        );
    });

    let lastValidIndex = -1;
    let cumulative = 0;

    const atualLine = Array.from({ length: points }, (_, i) => {
        const weekIndex = i + 1;

        if (actualMap.has(weekIndex)) {
            cumulative += actualMap.get(weekIndex)!;
            lastValidIndex = i;

            return {
                atual: cumulative,
            };
        }

        // depois do último dado real, corta a linha
        if (i > lastValidIndex) {
            return {
                atual: null,
            };
        }

        return {
            atual: null,
        };
    });

    return weeks.map((week, i) => ({
        week,
        meta: metaLine[i].meta,
        atual: atualLine[i].atual,
    }));
}