'use server'

import { revalidatePath } from "next/cache";

import { serverApi } from "../../services/serverApi";
import { IFilial } from "../../types/cadastros/cadastros";
import { IActionResponse } from "../types";

export async function createFilialAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const nome = formData.get("nome");
    const id_franqueadora =
        formData.get("id_franqueadora");
    try {
        const api = await serverApi();
        await api.post("/filiais", {
            nome,
            id_franqueadora,
        });
        revalidatePath(
            "/pages/cadastros/filiais"
        );
        return {
            success: true,
            successMessage: "Filial criada com sucesso",
        };
    } catch (error: any) {
        console.log(
            "Error creating filial:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao criar filial",
        };
    }
}

export async function updateFilialAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    const id = formData.get("id");

    const nome = formData.get("nome");

    const id_franqueadora =
        formData.get("id_franqueadora");

    try {
        const api = await serverApi();
        await api.put(`/filiais/${id}`, {
            nome,
            id_franqueadora,
        });
        revalidatePath(
            "/pages/cadastros/filiais"
        );
        return {
            success: true,
            successMessage: "Filial atualizada com sucesso",
        };

    } catch (error: any) {
        console.log(
            "Error updating filial:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao atualizar filial",
        };
    }
}

export async function getAllFiliais(): Promise<IFilial[]> {
    try {
        const api = await serverApi();
        const response =
            await api.get("/filiais");
        return response.data;
    } catch (error: any) {
        console.log(
            "Error getting filiais:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar as filiais"
        );
    }
}

export async function deleteFilialAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const id = formData.get("id");
    try {
        const api = await serverApi();
        await api.post(
            `/filiais/${id}/remover`
        );
        revalidatePath(
            "/pages/cadastros/filiais"
        );
        return {
            success: true,
            successMessage: "Filial removida com sucesso",
        };

    } catch (error: any) {
        console.log(
            "Error deleting filial:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao remover filial",
        };
    }
}