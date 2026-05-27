'use server'

import { revalidatePath } from "next/cache";
import { serverApi } from "../../services/serverApi";


interface IActionResponse {
    success: boolean;
    message: string;
}

export async function createUsuarioAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();

        await api.post("/usuarios", {
            nome: formData.get('nome'),
            email: formData.get('email'),
            senha: formData.get('senha'),
            confirmacao_senha: formData.get('confirmaSenha'),
            id_role: Number(formData.get('nivelUsuario')),
            id_nivel: Number(formData.get('nivelPermissao')),
            relacao: formData.get('relacao'),
        });
    revalidatePath("/pages/cadastros/usuarios");
    return {
        success: true,
        message: "usuario criada com sucesso",
    };

} catch (error: any) {
    console.log("Error creating usuario:", error);
    return {
        success: false,
        message:
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
            message: "usuario atualizada com sucesso",
        };

    } catch (error: any) {
        console.log("Error updating usuario:", error);
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Erro ao atualizar usuario",
        };
    }
}

export async function getAllUsuarios() {

    try {
        const api = await serverApi();
        const response = await api.get("/usuarios");
        return response.data;
    } catch (error: any) {
        console.log(
            "Error getting usuarios:",
            error
        );
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Erro ao buscar as usuario",
        };
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
console.log("DELETE RESPONSE:", response.data);
        return {
            success: true,
            message: "usuario removida com sucesso",
        };

    } catch (error: any) {

        console.log(
            "Error deleting usuario:",
            error
        );

        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Erro ao remover usuario",
        };
    }
}