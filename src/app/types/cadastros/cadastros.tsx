export interface IUser {
        id: string,
        nome: string,
        senha?: string,
        confirmSenha?: string,
        email: string,
        nivelUsuario: number,
        nivelPermissao: number
    }

export interface IFranqueadora {
    id: string,
    nome: string
}

export interface IFilial {
    id: string
    nome: string
    franqueadora_uuid: string
}

export interface IDepartamento {
    id: string
    nome: string
    filial_uuid: string
}