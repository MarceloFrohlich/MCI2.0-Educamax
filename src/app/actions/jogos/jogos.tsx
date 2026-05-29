'use server'

import { revalidatePath } from "next/cache";

import { serverApi } from "../../services/serverApi";
import { IActionResponse } from "../types";
import { ICup, IGame } from "../../types/centralMCI/centralMCI";
import { getErrorMessage } from "../../utils/getErrorMessage";

export async function createJogoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    const tem_plp = formData.get('hasplp') == 'on' ? true : false
    const excluirPeriodo = formData.get('excluir_periodo') == 'on' ? true : false

    const payload = {
        ids_copas: formData.getAll('selectedCopas'),
        id_lider: formData.get('leader'),
        nome: formData.get('gameName'),
        verbo: formData.get('verbo'),
        medida: formData.get('medida'),
        de: Number(formData.get('de')),
        para: Number(formData.get('para')),
        data_inicio: formData.get('inicio'),
        data_fim: formData.get('fim'),
        observacao: formData.get('observacoes'),
        tem_plp,
        previdencias: JSON.parse(
            formData.get("previdencias") as string
        ).map((measure: any) => ({
            unidade_medida: measure.unidade_medida,
            placar_desejado: measure.placar_desejado,
            excluir_periodo: excluirPeriodo,
            data_inicio: measure.data_inicio,
            data_fim: measure.data_fim,
            ...(measure.excluir_periodo && {
                inativo_de: measure.inativo_de,
                inativo_ate: measure.inativo_ate,
            }),
        }))
    }

    console.log('PAYLOAD', payload)
    console.log(`ID: ${formData.get('id')}`)
    try {
        const api = await serverApi();
        await api.post("/jogos", {
            ids_copas: formData.getAll('selectedCopas'),
            id_lider: formData.get('leader'),
            nome: formData.get('gameName'),
            verbo: formData.get('verbo'),
            medida: formData.get('medida'),
            de: Number(formData.get('de')),
            para: Number(formData.get('para')),
            data_inicio: formData.get('inicio'),
            data_fim: formData.get('fim'),
            observacao: formData.get('observacoes'),
            tem_plp,
            previdencias: JSON.parse(
                formData.get("previdencias") as string
            ).map((measure: any) => ({
                unidade_medida: measure.unidade_medida,
                placar_desejado: measure.placar_desejado,
                excluir_periodo: measure.excluir_periodo,
                data_inicio: measure.data_inicio,
                data_fim: measure.data_fim,
                verbo: measure.verbo,
                ...(measure.excluir_periodo && {
                    inativo_de: measure.inativo_de,
                    inativo_ate: measure.inativo_ate,
                }),
            }))
        });
        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Jogo criada com sucesso",
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao criar jogo"
            ),
        };
    }
}

export async function updatejogoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const tem_plp = formData.get('hasplp') == 'on' ? true : false

    try {
        const api = await serverApi();
        await api.put(`/jogos/${formData.get('id')}`, {
            ids_copas: formData.getAll('selectedCopas'),
            id_lider: formData.get('leader'),
            nome: formData.get('gameName'),
            verbo: formData.get('verbo'),
            medida: formData.get('medida'),
            de: Number(formData.get('de')),
            para: Number(formData.get('para')),
            data_inicio: formData.get('inicio'),
            data_fim: formData.get('fim'),
            observacao: formData.get('observacoes'),
            tem_plp
        });
        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Jogo atualizada com sucesso",
        };

    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao criar jogo"
            ),
        };
    }
}

export async function updatePrevidenciaAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    try {
        const api = await serverApi();
        await api.put(`/previdencias/${formData.get('id')}`, {
            previdencias: JSON.parse(
                formData.get("previdencias") as string
            ).map((measure: any) => ({
                id_previdencia: measure.id_previdencia,
                unidade_medida: measure.unidade_medida,
                placar_desejado: measure.placar_desejado,
                excluir_periodo: measure.excluir_periodo,
                data_inicio: measure.data_inicio,
                data_fim: measure.data_fim,
                verbo: measure.verbo,
                ...(measure.excluir_periodo && {
                    inativo_de: measure.inativo_de,
                    inativo_ate: measure.inativo_ate,
                }),
            }))
        });
        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Previdencia atualizada com sucesso",
        };

    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao editar Previdencia"
            ),
        };
    }
}

export async function getAlljogos(): Promise<IGame[]> {
    try {
        const api = await serverApi();
        const response =
            await api.get("/jogos");
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar as jogos"
        );
    }
}

export async function deletejogoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const id = formData.get("id");
    try {
        const api = await serverApi();
        await api.post(
            `/jogos/${id}/remover`
        );
        revalidatePath(
            "/pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Jogo removida com sucesso",
        };

    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao criar jogo"
            ),
        };
    }
}