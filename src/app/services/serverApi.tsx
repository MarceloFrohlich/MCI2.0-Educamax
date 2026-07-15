// services/serverApi.ts

import axios from "axios";
import { cookies } from "next/headers";

export async function serverApi() {

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}