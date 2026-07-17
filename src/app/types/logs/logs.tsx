export interface ILog {
    id_log: string
    data_hora: string
    metodo: string
    rota: string
    status: number
    sucesso: boolean
    mensagem_erro: string | null
    usuario: string | null
}
