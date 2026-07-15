// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { canAccess, paginaInicial, parseSessao } from "@/app/utils/permissoes";

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const token = request.cookies.get("token")?.value;
    const sessao = parseSessao(request.cookies.get("sessao")?.value);

    //logado na tela de login vai direto pra sua página inicial
    if (pathname === "/") {
        if (token) return NextResponse.redirect(new URL(paginaInicial(sessao), request.url));
        return NextResponse.next();
    }

    //sem login volta pro login antes de renderizar
    if (!token) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("sessao");
        return response;
    }

    //sem permissão na rota vai pra sua página inicial
    if (sessao && !canAccess(pathname, sessao) && pathname !== paginaInicial(sessao)) {
        return NextResponse.redirect(new URL(paginaInicial(sessao), request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/pages/:path*"],
};
