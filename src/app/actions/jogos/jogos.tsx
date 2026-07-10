'use server'

import { revalidatePath } from "next/cache";

import { serverApi } from "../../services/serverApi";
import { IActionResponse } from "../types";
import { IGame } from "../../types/centralMCI/centralMCI";
import { getErrorMessage } from "../../utils/getErrorMessage";

export async function createJogoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    const tem_plp = formData.get('hasplp') == 'on' ? true : false
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
            successMessage: "Jogo criado com sucesso",
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
    const measure = JSON.parse(
        formData.get("measure") as string
    );
    try {
        const api = await serverApi();
        await api.put(
            `/previdencias/${formData.get("id")}`,
            {
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
            }
        );
        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage:
                "Previdência atualizada com sucesso",
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao editar Previdência"
            ),
        };

    }
}

export async function createPrevidenciaAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const measure = JSON.parse(
        formData.get("measure") as string
    );
    try {
        const api = await serverApi();
        await api.post(
            "/previdencias",
            {
                id_jogo: formData.get("id_jogo"),
                unidade_medida: measure.unidade_medida,
                placar_desejado: Number(measure.placar_desejado),
                data_inicio: measure.data_inicio,
                data_fim: measure.data_fim,
                verbo: measure.verbo,
                excluir_periodo: measure.excluir_periodo,
                ...(measure.excluir_periodo && {
                    inativo_de: measure.inativo_de,
                    inativo_ate: measure.inativo_ate,
                }),
            }
        );

        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage:
                "Previdência criada com sucesso",
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao criar Previdência"
            ),
        };
    }

}

export async function getJogosFiltrados({
    id_departamento,
    id_lider,
    nome,
    id_copa,
}: {
    id_departamento?: string;
    id_lider?: string;
    nome?: string;
    id_copa?:string
}): Promise<IGame[]> {
    try {
        const api = await serverApi();

        const response = await api.post(
            "/jogos/filtrar",
            {
                ...(id_copa && {
                    id_copa,
                }),
                ...(id_departamento && {
                    id_departamento,
                }),
                ...(id_lider && {
                    id_lider,
                }),
                ...(nome && {
                    nome,
                }),
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar jogos"
        );
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

export async function deletePrevidenciaAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    const id = formData.get("id");
    try {
        const api = await serverApi();
        await api.post(
            `/previdencias/${id}/remover`
        );
        revalidatePath(
            "/pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Previdencia removida com sucesso",
        };

    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao remover Previdencia"
            ),
        };
    }
}

export async function deletejogoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    try {
        const api = await serverApi();
        await api.post(
            `/jogos/${formData.get("id")}/remover`
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
                "Erro ao deletar jogo"
            ),
        };
    }
}


export async function atualizacaoSemanalAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {
    try {
        const api = await serverApi();
        await api.post(
            `/previdencias/${formData.get("previdenciaId")}/semanas/${Number(formData.get("semana"))}`, {
            realizado: Number(formData.get("realizado")),
            compromisso: Number(formData.get("compromisso")),
            ...(formData.get("tem_plp") === "true" && {
                entrevistaqtd: Number(formData.get("entrevistaqtd")),
                promotores: Number(formData.get("promotores")),
                neutros: Number(formData.get("neutros")),
                detratores: Number(formData.get("detratores"))
            }),
        }
        );
        revalidatePath(
            "/pages/atualizacao"
        );
        return {
            success: true,
            successMessage:
                "Medida atualizada com sucesso",
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao editar Medida"
            ),
        };

    }
}


export async function replicarJogoAction(
    _: IActionResponse,
    formData: FormData
): Promise<IActionResponse> {

    try {
        const api = await serverApi();
        await api.post(`/jogos/${formData.get('id')}/replicar`, {
            ids_copas_destino: formData.getAll('selectedCopas'),
        });
        revalidatePath(
            "pages/centralmci"
        );
        return {
            success: true,
            successMessage: "Jogo replicado com sucesso",
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: getErrorMessage(
                error,
                "Erro ao replicar jogo"
            ),
        };
    }
}