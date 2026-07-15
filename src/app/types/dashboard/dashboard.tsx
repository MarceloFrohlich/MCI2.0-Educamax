export interface IMciEvolutionDataPoint {
    week: string;
    meta: number;
    atual: number | null;
}

export interface IDashboardDia {
    dia: string,
    total: number,
    hoje: boolean
}

export interface IDashboardMci {
    id_jogo: string,
    nome: string,
    sigla: string,
    departamento: string,
    percentual: number,
    situacao: 'verde' | 'laranja' | 'amarelo',
    concluida: boolean,
    ativa: boolean
}

export interface IDashboardUnidade {
    sigla: string,
    nome: string,
    meta: number,
    resultado: number
}

export interface IDashboardRanking {
    posicao: number,
    sigla: string,
    nome: string,
    percentual: number
}

export interface IDashboardAlerta {
    tipo: 'risco' | 'sem_atualizacao' | 'nova_mci' | 'meta_atingida',
    titulo: string,
    descricao: string
}

export interface IDashboardEvolucaoSemana {
    semana: number,
    meta: number,
    atual: number | null
}

export interface IDashboard {
    ano: number,

    progresso_semana: {
        percentual: number,
        dias: IDashboardDia[]
    },

    on_track: {
        percentual: number,
        variacao: number
    },

    mcis: {
        ativas: number,
        concluidas: number,
        lista: IDashboardMci[]
    },

    compromissos: {
        percentual: number,
        concluidos: number,
        avaliados: number,
        concluidos_nesta_semana: number,
        variacao: number
    },

    engajamento: {
        nota: number,
        variacao: number
    },

    evolucao_semanal: IDashboardEvolucaoSemana[],
    evolucao_unidades: IDashboardUnidade[],
    ranking: IDashboardRanking[],
    alertas: IDashboardAlerta[]
}
