export interface ISessao {
    id_usuario: string,
    nome: string,
    id_role: number,
    id_nivel: number,
    relacao: string | null,
    ano_ativo: number
}
