import { IPrevidencia } from "../../types/centralMCI/centralMCI";

export const customStyles = {
    table: {
        style: {
            backgroundColor: '#FFFFFF',
            borderRadius: '0.5rem',
            overflow: 'hidden',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#FFFFFF',
            borderBottomWidth: '0px',
        },
    },
    rows: {
        style: {
            backgroundColor: '#FFFFFF',
            borderBottomWidth: '0px',
            minHeight: '50px',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#FFFFFF',
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
    const [, month, day] = date.split('-');
    return `${day}/${month}`;
}

export function mapPrevidenciaToEvolutionChart(previdencia: IPrevidencia) {

    let weeks: { date: string; numeroSemana: number }[] = [];

    if (previdencia.semanas && previdencia.semanas.length > 0) {

        weeks = previdencia.semanas
            .filter(semana => !semana.inativa)
            .map(semana => ({
                date: semana.data_previsto_lancamento,
                numeroSemana: semana.numero_semana,
            }));

    } else {

        const start = new Date(previdencia.data_inicio);
        const end = new Date(previdencia.data_fim);

        const temInatividade =
            previdencia.excluir_periodo &&
            previdencia.inativo_de &&
            previdencia.inativo_ate;

        const inativoDe = temInatividade
            ? new Date(previdencia.inativo_de).getTime()
            : null;

        const inativoAte = temInatividade
            ? new Date(previdencia.inativo_ate).getTime()
            : null;

        const current = new Date(start);
        let numeroSemana = 0;

        while (current <= end) {
            numeroSemana += 1;

            const isInativa =
                inativoDe !== null &&
                inativoAte !== null &&
                current.getTime() >= inativoDe &&
                current.getTime() <= inativoAte;

            if (!isInativa) {
                weeks.push({
                    date: current.toISOString().split("T")[0],
                    numeroSemana,
                });
            }

            current.setDate(current.getDate() + 7);
        }
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

    const atualLine = weeks.map((week, i) => {

        if (actualMap.has(week.numeroSemana)) {
            cumulative += actualMap.get(week.numeroSemana)!;
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
        week: week.date,
        meta: metaLine[i].meta,
        atual: atualLine[i].atual,
    }));
}