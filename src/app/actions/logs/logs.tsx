'use server'

import { logDev } from "../../utils/getErrorMessage";
import { serverApi } from "../../services/serverApi";
import { ILog } from "../../types/logs/logs";

export async function getAllLogs(): Promise<ILog[]> {

    try {
        const api = await serverApi();
        const response = await api.get("/logs");
        return response.data;
    } catch (error: any) {
        logDev(
            "Error getting logs:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar os logs"
        );
    }
}
