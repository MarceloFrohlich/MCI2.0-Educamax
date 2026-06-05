import { Ilancamento } from "../atualizacoes/atualizacoes";
import { IDepartamento } from "../cadastros/cadastros";

export interface ILeader {
    id_lider: string
    id_franqueadora: string
    nome: string
    data_criacao: string
    data_atualizacao: string
    deletado_em: string
    franqueadora: string
}

export interface ICup {
    id_copa: string
    id_departamento: string
    id_lider: string
    nome: string
    objetivo: string
    inicio: string
    fim: string
    verbo: string
    medida: string
    de: number
    ate: number
    data_criacao: string
    data_atualizacao: string
    deletado_em: string
    departamento: IDepartamento
    lider: ILeader
}

export interface IDirectionMeasure {
    id: string;
    verbo: string;
    unidadeMedida: string;
    placarDesejado: number;
    dataInicial: string;
    dataFinal: string;
    excluirPeriodo: boolean;
    dataInicialPeriodoExcluido?: string;
    dataFinalPeriodoExcluido?: string;
}

export interface ISemana {
    numero_semana: number,
    data_inicio_semana: string,
    data_fim_semana: string,
    inativa: boolean,
    status: string,
    permite_lancamento: boolean,
    lancamento: ILancamento
}

export interface ILancamento {
    realizado: number,
    compromisso: number,
    entrevistaqtd: number,
    promotores: number,
    neutros: number,
    detratores: number
}

export interface IGame {
    id_jogo: string,
    id_copa: string,
    id_lider: string,
    nome: string,
    verbo: string,
    medida: string,
    de: number,
    para: number,
    data_inicio: string,
    data_fim: string,
    observacao: string,
    tem_plp: boolean,
    semanas: null,
    data_criacao: string,
    data_atualizacao: string,
    deletado_em: string,
    copa: ICup,
    lider: ILeader,
    status: null,
    previdencias: IPrevidencia[]
}


export interface IPrevidencia {
    id_previdencia: string
    id_jogo: string
    unidade_medida: string
    placar_atual: number
    placar_inicial: number
    placar_desejado: number
    data_inicio: string
    data_fim: string
    inativo_de: string
    inativo_ate: string
    excluir_periodo: boolean
    plp_media: number
    verbo: string
    data_criacao: string
    data_atualizacao: string
    deletado_em: string
    semanas: ISemana[]
}

export type IPrevidenciaForm = Pick<
    IPrevidencia,
    | 'id_previdencia'
    | 'verbo'
    | 'unidade_medida'
    | 'placar_desejado'
    | 'data_inicio'
    | 'data_fim'
    | 'excluir_periodo'
    | 'inativo_de'
    | 'inativo_ate'
>;