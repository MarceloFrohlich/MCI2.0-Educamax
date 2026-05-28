'use server'

import { revalidatePath } from "next/cache";

import { serverApi } from "../../services/serverApi";
import { IActionResponse } from "../types";
import { ILeader } from "../../types/centralMCI/centralMCI";

export async function createLiderAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();
        await api.post("/lideres", {
            nome: formData.get('newleader'),

        });
        revalidatePath(
            "/pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Lider criado com sucesso",
        };
    } catch (error: any) {
        console.log(
            "Error creating lider:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao criar lider",
        };
    }
}

export async function updateLiderAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();
        await api.put(`/lideres/${formData.get("id")}`, {
            nome: formData.get("newleader")
        });
        revalidatePath(
           "/pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Lider atualizado com sucesso",
        };

    } catch (error: any) {
        console.log(
            "Error updating lider:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao atualizar lider",
        };
    }
}

export async function getAllLideres(): Promise<ILeader[]> {
    try {
        const api = await serverApi();
        const response =
            await api.get("/lideres");
        return response.data;
    } catch (error: any) {
        console.log(
            "Error getting leaders:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar os lideres"
        );
    }
}

export async function deleteLiderAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();
        await api.post(
            `/lideres/${formData.get("id")}/remover`
        );
        revalidatePath(
            "/pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Lider removido com sucesso",
        };

    } catch (error: any) {
        console.log(
            "Error deleting lider:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao remover lider",
        };
    }
}