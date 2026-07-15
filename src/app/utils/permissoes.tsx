// app/utils/permissoes.ts

import { ISessao } from "../types/auth/auth";

export const ROLE_ADMIN_GLOBAL = 1;
export const ROLE_ADMIN_LOCAL = 2;

export const NIVEL_FRANQUEADORA = 1;
export const NIVEL_FILIAL = 2;
export const NIVEL_DEPARTAMENTO = 3;

interface IRegraRota {
    prefixo: string,
    roles?: number[],
    niveis?: number[]
}

//rota sem regra = liberada para qualquer logado (a api já devolve os dados filtrados)
export const regrasRotas: IRegraRota[] = [
    { prefixo: "/pages/cadastros/usuarios", roles: [ROLE_ADMIN_GLOBAL] },
];

export function parseSessao(cookie: string | undefined): ISessao | null {
    if (!cookie) return null;

    try {
        return JSON.parse(cookie);
    } catch {
        return null;
    }
}

export function canAccess(pathname: string, sessao: ISessao | null): boolean {
    if (sessao?.id_role === ROLE_ADMIN_GLOBAL) return true;

    const regra = regrasRotas
        .filter(regra => pathname === regra.prefixo || pathname.startsWith(`${regra.prefixo}/`))
        .sort((a, b) => b.prefixo.length - a.prefixo.length)[0];

    if (!regra) return true;
    if (!sessao) return false;
    if (regra.roles && !regra.roles.includes(sessao.id_role)) return false;
    if (regra.niveis && !regra.niveis.includes(sessao.id_nivel)) return false;

    return true;
}
