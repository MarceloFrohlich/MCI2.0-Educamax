import { IPrevidencia } from "../centralMCI/centralMCI"


export interface IJogoStatus {
    id_status: string,
    id_jogo: string,
    valor: number,
    status: 'success' | 'unsuccess',
    data_criacao: string,
    data_atualizacao: string,
    deletado_em: string
}

export interface IRelatorio   {
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
    semanas: number,
    data_criacao: string,
    data_atualizacao: string,
    deletado_em: string,
    status: IJogoStatus | null,
    previdencias: IPrevidencia[]
}