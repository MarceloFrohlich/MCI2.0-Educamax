export interface IUserBase {
    id_usuario: string,
    id_role: number,
    id_nivel: number,
    nome: string,
    email: string,
    senha: string,

    data_criacao: string | null,
    data_atualizacao: string | null,
    deletado_em: string | null,

    role: {
        id_role: number,
        nome: string
    },

    nivel: {
        id_nivel: number,
        nome: string
    },
}

export interface IFranqueadora {
    id_franqueadora: string,
    nome: string,
    data_criacao: string,
    data_atualizacao: string | null,
    deletado_em: string | null
}

export interface IFilial {
    id_filial: string,
    id_franqueadora: string,
    nome: string,
    data_criacao: string,
    data_atualizacao: string | null,
    deletado_em: string | null,
    franqueadora: IFranqueadora
}

export interface IDepartamento {
    id_departamento: string,
    id_filial: string,
    nome: string,
    data_criacao: string,
    data_atualizacao: string | null,
    deletado_em: string | null,
    filial: IFilial
}

export interface IUserDepartamento extends IUserBase {
    relacao: 'departamento',
    entidade_relacao: IDepartamento
}

export interface IUserFilial extends IUserBase {
    relacao: 'filial',
    entidade_relacao: IFilial
}

export interface IUserFranqueadora extends IUserBase {
    relacao: 'franqueadora',
    entidade_relacao: IFranqueadora
}

export type IUser =
    | IUserDepartamento
    | IUserFilial
    | IUserFranqueadora