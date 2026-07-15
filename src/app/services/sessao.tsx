// services/sessao.ts

import { cookies } from "next/headers";
import { ISessao } from "../types/auth/auth";
import { parseSessao } from "../utils/permissoes";

export async function getSessao(): Promise<ISessao | null> {

    const cookieStore = await cookies();

    return parseSessao(cookieStore.get("sessao")?.value);
}
