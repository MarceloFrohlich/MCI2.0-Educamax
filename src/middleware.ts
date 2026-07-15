// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { canAccess, paginaInicial, parseSessao, tokenExpirado } from "@/app/utils/permissoes";

function voltarProLogin(request: NextRequest) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token");
    response.cookies.delete("sessao");
    return response;
}

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const token = request.cookies.get("token")?.value;
    const sessao = parseSessao(request.cookies.get("sessao")?.value);

    const logado = token && !tokenExpirado(token) && sessao;

    //logado na tela de login vai direto pra sua página inicial
    if (pathname === "/") {
        if (logado) return NextResponse.redirect(new URL(paginaInicial(sessao), request.url));
        return NextResponse.next();
    }

    //sem login, token vencido ou sessão ausente: volta pro login antes de renderizar
    if (!logado) {
        return voltarProLogin(request);
    }

    //sem permissão na rota vai pra sua página inicial
    if (!canAccess(pathname, sessao) && pathname !== paginaInicial(sessao)) {
        return NextResponse.redirect(new URL(paginaInicial(sessao), request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/pages/:path*"],
};
