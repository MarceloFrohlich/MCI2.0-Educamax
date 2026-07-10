'use server'

import { revalidatePath } from "next/cache";

import { serverApi } from "../../services/serverApi";
import { IActionResponse } from "../types";
import { getErrorMessage } from "../../utils/getErrorMessage";

export async function avaliarMciAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();
        await api.post(
            `/relatorios/status/${formData.get("id_jogo")}`,
            {
                valor: Number(formData.get("valor")),
            }
        );
        revalidatePath(
            "/pages/relatorios/analise"
        );
        return {
            success: true,
            successMessage: "Resultado atualizado com sucesso",
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao atualizar resultado"
            ),
        };
    }
}

export async function getRelatorios(id_copa: string) {
    try {
        const api = await serverApi();
        const response = await api.get(`/relatorios/copa/${id_copa}/previdencias`)
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar relatórios"
        );
    }
}
