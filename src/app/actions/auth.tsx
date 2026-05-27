// app/actions/auth.ts
'use server'

import { api } from "../services/api";
import { cookies } from "next/headers";
import { serverApi } from "../services/serverApi";

export async function loginAction(_: any, formData: FormData) {
  const email = formData.get("email");
  const senha = formData.get("senha");

  try {
    const response = await api.post("/auth/login", {
      email,
      senha,
    });
    console.log(response.data);
    const token = response.data.access_token;

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true,
    };

  } catch (error: any) {
    console.log("Login error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Erro ao fazer login",
    };
  }
}

export async function sendRecoveryCodeAction(
    _: IActionResponse,
    formData: FormData
) {
    try {
        await api.post("/auth/esqueci-senha", {
            email: formData.get('emailRecovery'),
        });

    return {
        success: true,
        message: "Código enviado por email com sucesso",
    };

} catch (error: any) {
    console.log("Error sending password:", error);
    return {
        success: false,
        message:
            error.response?.data?.message ||
            "Erro ao enviar a senha",
    };
}
}