'use server'

import { revalidatePath } from "next/cache";
import { logDev } from "../../utils/getErrorMessage";
import { serverApi } from "../../services/serverApi";
import { IUser } from "../../types/cadastros/cadastros";
import { IActionResponse } from "../types";

export async function createUsuarioAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();

        await api.post("/usuarios", {
            nome: formData.get('nome'),
            email: formData.get('email'),
            id_role: Number(formData.get('nivelUsuario')),
            id_nivel: Number(formData.get('nivelPermissao')),
            relacao: formData.get('relacao'),
        });
        revalidatePath("/pages/cadastros/usuarios");
        return {
            success: true,
            successMessage: "Usuário criado! O convite foi enviado por e-mail",
        };

    } catch (error: any) {
        logDev("Error creating usuario:", error);
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao criar usuario",
        };
    }
}

export async function updateUsuarioAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    try {
        const api = await serverApi();

        await api.put(`/usuarios/${formData.get("id")}`, {
            nome: formData.get('nome'),
            email: formData.get('email'),
            id_role: Number(formData.get('nivelUsuario')),
            id_nivel: Number(formData.get('nivelPermissao')),
            relacao: formData.get('relacao'),
        });

        revalidatePath("/pages/cadastros/usuarios");

        return {
            success: true,
            successMessage: "usuario atualizada com sucesso",
        };

    } catch (error: any) {
        logDev("Error updating usuario:", error);
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao atualizar usuario",
        };
    }
}

export async function reenviarConviteAction(id: string): Promise<IActionResponse> {

    try {
        const api = await serverApi();
        await api.post(`/usuarios/${id}/reenviar-convite`);
        return {
            success: true,
            successMessage: "Convite enviado com sucesso",
        };
    } catch (error: any) {
        logDev("Error resending invite:", error);
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao enviar o convite",
        };
    }
}

export async function getAllUsuarios(): Promise<IUser[]> {

    try {
        const api = await serverApi();
        const response = await api.get("/usuarios");
        return response.data;
    } catch (error: any) {
        logDev(
            "Error getting usuarios:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar os usuarios"
        );
    }
}

export async function deleteUsuarioAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();
        const response = await api.post(
            `/usuarios/${formData.get("id")}/remover`
        );
        revalidatePath(
            "/pages/cadastros/usuarios"
        );
        logDev("DELETE RESPONSE:", response.data);
        return {
            success: true,
            successMessage: "usuario removida com sucesso",
        };

    } catch (error: any) {

        logDev(
            "Error deleting usuario:",
            error
        );

        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao remover usuario",
        };
    }
}