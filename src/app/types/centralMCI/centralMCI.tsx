import { Ilancamento } from "../atualizacoes/atualizacoes";
import { IDepartamento } from "../cadastros/cadastros";

export interface ILeader {
    id_lider: string,
    id_franqueadora: string,
    nome: string,
    data_criacao: string,
    data_atualizacao: string,
    deletado_em: string,
    franqueadora: string
}

export interface ICup {
    id_copa: string,
    id_departamento: string,
    id_lider: string,
    nome: string,
    objetivo: string,
    inicio: string,
    fim: string,
    verbo: string,
    medida: string,
    de: number,
    ate: number,
    data_criacao: string,
    data_atualizacao: string,
    deletado_em: string,
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
    semana: number;
    status: "concluída" | "disponivel" | "indisponivel";
    permiteLancamento: boolean;
    lancamento: Ilancamento | null;
}

export interface IGame {
    id: string;
    nome: string;
    copa: ICup
    lider: ILeader;
    departamento: IDepartamento;
    verbo: string;
    medida: string;
    de: number;
    para: number;
    inicio: string;
    fim: string;
    observacoes?: string;
    incluirPLP: boolean;
    medidasDirecao: IDirectionMeasure[];
}