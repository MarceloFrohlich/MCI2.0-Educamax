import { Ilancamento } from "../atualizacoes/atualizacoes";

export interface ILeader {
    id: number;
    nome: string;
}

export interface ICup {
    id: number;
    nome: string;
    lider: ILeader;
    verbo: string;
    medida: string;
    de: number;
    para: number;
    inicio: string;
    fim: string;
    departamentos: string[];
}

export interface IDepartment {
  id: number;
  nome: string;
}

export interface IDirectionMeasure {
    id: number;
    verbo: string;
    unidadeMedida: string;
    placarDesejado: number;
    dataInicial: string;
    dataFinal: string;
    excluirPeriodo: boolean;
    dataInicialPeriodoExcluido?: string;
    dataFinalPeriodoExcluido?: string;
    semanas: ISemana[];
}

export interface ISemana {
    semana: number;
    status: "concluída" | "disponivel" | "indisponivel";
    permiteLancamento: boolean;
    lancamento: Ilancamento | null;
}

export interface IGame {
    id: number;
    nome: string;
    lider: ILeader;
    departamentos: IDepartment[];
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