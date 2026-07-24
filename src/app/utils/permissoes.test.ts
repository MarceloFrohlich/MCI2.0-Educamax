import { describe, expect, it } from "vitest";
import { canAccess, paginaInicial, parseSessao, tokenExpirado } from "./permissoes";
import { ISessao } from "../types/auth/auth";

const sessao = (dados: Partial<ISessao> = {}): ISessao => ({
    id_usuario: "x",
    nome: "Teste",
    id_role: 2,
    id_nivel: 1,
    relacao: "abc",
    ano_ativo: 2026,
    ...dados,
});

//monta um jwt fake só com o payload (a assinatura não é validada no front)
const jwt = (exp: number) =>
    `header.${Buffer.from(JSON.stringify({ exp })).toString("base64url")}.assinatura`;

describe("canAccess", () => {

    it("admin global acessa qualquer rota", () => {
        const global = sessao({ id_role: 1 });
        expect(canAccess("/pages", global)).toBe(true);
        expect(canAccess("/pages/cadastros/usuarios", global)).toBe(true);
        expect(canAccess("/pages/cadastros/franqueadoras", global)).toBe(true);
    });

    it("usuário comum (role 3) só acessa atualização semanal e perfil", () => {
        const comum = sessao({ id_role: 3, id_nivel: 3 });
        expect(canAccess("/pages/atualizacao", comum)).toBe(true);
        expect(canAccess("/pages/perfil", comum)).toBe(true);
        expect(canAccess("/pages", comum)).toBe(false);
        expect(canAccess("/pages/centralmci", comum)).toBe(false);
        expect(canAccess("/pages/cadastros/usuarios", comum)).toBe(false);
        expect(canAccess("/pages/relatorios", comum)).toBe(false);
    });

    it("admin de franqueadora cadastra filial, departamento e usuário, mas não franqueadora", () => {
        const franqueadora = sessao({ id_nivel: 1 });
        expect(canAccess("/pages/cadastros/franqueadoras", franqueadora)).toBe(false);
        expect(canAccess("/pages/cadastros/filiais", franqueadora)).toBe(true);
        expect(canAccess("/pages/cadastros/departamentos", franqueadora)).toBe(true);
        expect(canAccess("/pages/cadastros/usuarios", franqueadora)).toBe(true);
    });

    it("admin de filial só cadastra departamento", () => {
        const filial = sessao({ id_nivel: 2 });
        expect(canAccess("/pages/cadastros/franqueadoras", filial)).toBe(false);
        expect(canAccess("/pages/cadastros/filiais", filial)).toBe(false);
        expect(canAccess("/pages/cadastros/departamentos", filial)).toBe(true);
        expect(canAccess("/pages/cadastros/usuarios", filial)).toBe(false);
    });

    it("admin de departamento não cadastra nada", () => {
        const departamento = sessao({ id_nivel: 3 });
        expect(canAccess("/pages/cadastros/franqueadoras", departamento)).toBe(false);
        expect(canAccess("/pages/cadastros/filiais", departamento)).toBe(false);
        expect(canAccess("/pages/cadastros/departamentos", departamento)).toBe(false);
        expect(canAccess("/pages/cadastros/usuarios", departamento)).toBe(false);
    });

    it("rota sem regra é liberada para admins", () => {
        expect(canAccess("/pages/centralmci", sessao({ id_nivel: 3 }))).toBe(true);
        expect(canAccess("/pages/relatorios", sessao({ id_nivel: 2 }))).toBe(true);
    });

    it("sem sessão, rota com regra é bloqueada", () => {
        expect(canAccess("/pages/cadastros/usuarios", null)).toBe(false);
        expect(canAccess("/pages/cadastros/franqueadoras", null)).toBe(false);
    });
});

describe("paginaInicial", () => {

    it("usuário comum entra na atualização semanal", () => {
        expect(paginaInicial(sessao({ id_role: 3 }))).toBe("/pages/atualizacao");
    });

    it("admins entram no dashboard", () => {
        expect(paginaInicial(sessao({ id_role: 1 }))).toBe("/pages");
        expect(paginaInicial(sessao({ id_role: 2 }))).toBe("/pages");
        expect(paginaInicial(null)).toBe("/pages");
    });
});

describe("parseSessao", () => {

    it("aceita json válido", () => {
        const valida = sessao();
        expect(parseSessao(JSON.stringify(valida))).toEqual(valida);
    });

    it("rejeita cookie ausente ou corrompido", () => {
        expect(parseSessao(undefined)).toBeNull();
        expect(parseSessao("não é json")).toBeNull();
    });
});

describe("tokenExpirado", () => {

    it("token válido dentro do prazo", () => {
        expect(tokenExpirado(jwt(Math.floor(Date.now() / 1000) + 3600))).toBe(false);
    });

    it("token vencido", () => {
        expect(tokenExpirado(jwt(Math.floor(Date.now() / 1000) - 60))).toBe(true);
    });

    it("token ausente ou malformado conta como expirado", () => {
        expect(tokenExpirado(undefined)).toBe(true);
        expect(tokenExpirado("abc")).toBe(true);
        expect(tokenExpirado("a.b.c")).toBe(true);
    });
});
