'use server'

import { revalidatePath } from "next/cache";
import { serverApi } from "../../services/serverApi";


interface IActionResponse {
    success: boolean;
    message: string;
}

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
            message: "Franqueadora criada com sucesso",
        };

    } catch (error: any) {
        console.log("Error creating franqueadora:", error);
        return {
            success: false,
            message:
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
            message: "Franqueadora atualizada com sucesso",
        };

    } catch (error: any) {
        console.log("Error updating franqueadora:", error);
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Erro ao atualizar franqueadora",
        };
    }
}

export async function getAllFranqueadoras() {

    try {
        const api = await serverApi();
        const response = await api.get("/franqueadoras");
        return response.data;
    } catch (error: any) {
        console.log(
            "Error getting franqueadoras:",
            error
        );
       return {
            success: false,
            message:
                error.response?.data?.message ||
                "Erro ao buscar as franqueadora",
        };
    }
}