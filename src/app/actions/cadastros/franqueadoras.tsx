'use server'

import { revalidatePath } from "next/cache";
import { logDev } from "../../utils/getErrorMessage";
import { serverApi } from "../../services/serverApi";
import { IFranqueadora } from "../../types/cadastros/cadastros";
import { IActionResponse } from "../types";

export async function createFranqueadoraAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    const nome = formData.get("nome");

    try {
        const api = await serverApi();

        await api.post("/franqueadoras", {
            nome,
        });
        revalidatePath("/pages/cadastros/franqueadoras");
        return {
            success: true,
            successMessage: "Franqueadora criada com sucesso",
        };

    } catch (error: any) {
        logDev("Error creating franqueadora:", error);
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao criar franqueadora",
        };
    }
}

export async function updateFranqueadoraAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    const id = formData.get("id");
    const nome = formData.get("nome");

    try {
        const api = await serverApi();

        await api.put(`/franqueadoras/${id}`, {
            nome,
        });

        revalidatePath("/pages/cadastros/franqueadoras");

        return {
            success: true,
            successMessage: "Franqueadora atualizada com sucesso",
        };

    } catch (error: any) {
        logDev("Error updating franqueadora:", error);
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao atualizar franqueadora",
        };
    }
}

export async function getAllFranqueadoras(): Promise<IFranqueadora[]> {

    try {
        const api = await serverApi();
        const response = await api.get("/franqueadoras");
        return response.data;
    } catch (error: any) {
        logDev(
            "Error getting franqueadoras:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar as franqueadoras"
        );
    }
}

export async function deleteFranqueadoraAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    const id = formData.get("id");

    try {
        const api = await serverApi();
        await api.post(
            `/franqueadoras/${id}/remover`
        );
        revalidatePath(
            "/pages/cadastros/franqueadoras"
        );

        return {
            success: true,
            successMessage: "Franqueadora removida com sucesso",
        };

    } catch (error: any) {

        logDev(
            "Error deleting franqueadora:",
            error
        );

        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao remover franqueadora",
        };
    }
}