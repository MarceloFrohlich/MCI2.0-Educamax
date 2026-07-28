'use server'

import { revalidatePath } from "next/cache";
import { logDev } from "../../utils/getErrorMessage";

import { serverApi } from "../../services/serverApi";
import { IActionResponse } from "../types";
import { ICup } from "../../types/centralMCI/centralMCI";

export async function createCopaAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();
        await api.post("/copas", {
            nome: formData.get('cupName'),
            ids_departamentos: formData
                .getAll('departamentos')
                .map((id) => id),
            id_lider: formData.get('leader') || undefined,
            inicio: formData.get('start_date'),
            fim: formData.get('end_date'),
            verbo: formData.get('verbo'),
            medida: formData.get('medida'),
            de: Number(formData.get('de')),
            ate: Number(formData.get('para'))
        });
        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Copa criada com sucesso",
        };
    } catch (error: any) {
        logDev(
            "Error creating copa:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao criar copa",
        };
    }
}

export async function updateCopaAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    try {
        const api = await serverApi();
        await api.put(`/copas/${formData.get('id')}`, {
            nome: formData.get('cupName'),
            ids_departamentos: formData
                .getAll('departamentos')
                .map((id) => id),
            id_lider: formData.get('leader') || undefined,
            inicio: formData.get('start_date'),
            fim: formData.get('end_date'),
            verbo: formData.get('verbo'),
            medida: formData.get('medida'),
            de: Number(formData.get('de')),
            ate: Number(formData.get('para'))
        });
        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Copa atualizada com sucesso",
        };

    } catch (error: any) {
        logDev(
            "Error updating copa:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao atualizar copa",
        };
    }
}

export async function getAllCopas(): Promise<ICup[]> {
    try {
        const api = await serverApi();
        const response =
            await api.get("/copas");
        return response.data;
    } catch (error: any) {
        logDev(
            "Error getting copas:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar as copas"
        );
    }
}

export async function deleteCopaAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const id = formData.get("id");
    try {
        const api = await serverApi();
        await api.post(
            `/copas/${id}/remover`
        );
        revalidatePath(
            "/pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Copa removida com sucesso",
        };

    } catch (error: any) {
        logDev(
            "Error deleting copa:",
            error
        );
        return {
            success: false,
            errorMessage:
                error.response?.data?.message ||
                "Erro ao remover copa",
        };
    }
}