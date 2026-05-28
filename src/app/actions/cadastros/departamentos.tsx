'use server'

import { revalidatePath } from "next/cache";

import { serverApi } from "../../services/serverApi";
import { IDepartamento } from "../../types/cadastros/cadastros";
import { IActionResponse } from "../types";

export async function createDepartamentoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const nome = formData.get("departamento");
    const id_filial =
        formData.get("id_filial");
    try {
        const api = await serverApi();
        await api.post("/departamentos", {
            nome,
            id_filial,
        });
        revalidatePath(
            "/pages/cadastros/departamentos"
        );
        return {
            success: true,
            successMessage: "Departamento criado com sucesso",
        };
    } catch (error: any) {
        console.log(
            "Error creating departamento:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao criar departamento",
        };
    }
}

export async function updateDepartamentoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    const id = formData.get("id");

    const nome = formData.get("departamento");

    const id_filial =
        formData.get("id_filial");

    try {
        const api = await serverApi();
        await api.put(`/departamentos/${id}`, {
            nome,
            id_filial,
        });
        revalidatePath(
            "/pages/cadastros/departamentos"
        );
        return {
            success: true,
            successMessage: "Departamento atualizado com sucesso",
        };

    } catch (error: any) {
        console.log(
            "Error updating departamento:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao atualizar departamento",
        };
    }
}

export async function getAllDepartamentos(): Promise<IDepartamento[]> {
    try {
        const api = await serverApi();
        const response =
            await api.get("/departamentos");
        return response.data;
    } catch (error: any) {
        console.log(
            "Error getting departamentos:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar os departamentos"
        );
    }
}

export async function deleteDepartamentoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const id = formData.get("id");
    try {
        const api = await serverApi();
        await api.post(
            `/departamentos/${id}/remover`
        );
        revalidatePath(
            "/pages/cadastros/departamentos"
        );
        return {
            success: true,
            successMessage: "Departamento removido com sucesso",
        };

    } catch (error: any) {
        console.log(
            "Error deleting departamento:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao remover departamento",
        };
    }
}