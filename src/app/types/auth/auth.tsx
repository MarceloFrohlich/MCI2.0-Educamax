export interface ISessao {
    id_usuario: string,
    nome: string,
    id_role: number,
    id_nivel: number,
    relacao: string | null,
    ano_ativo: number
}

export interface IMe {
    id_usuario: string,
    nome: string,
    email: string,
    role: string,
    nivel: string,
    id_role: number,
    id_nivel: number,
    relacao: string | null,
    ano_ativo: number,
    hierarquia: { nome: string } | null
}
