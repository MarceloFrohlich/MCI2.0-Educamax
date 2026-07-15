'use server'

import { serverApi } from "../../services/serverApi";
import { IDashboard } from "../../types/dashboard/dashboard";

export async function getDashboard(): Promise<IDashboard> {

    try {
        const api = await serverApi();
        const response = await api.get("/dashboard");
        return response.data;
    } catch (error: any) {
        console.log("Error getting dashboard:", error);

        throw new Error(
            error.response?.data?.message ||
            "Erro ao buscar o dashboard"
        );
    }
}
