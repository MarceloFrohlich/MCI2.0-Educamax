// app/actions/auth.ts
'use server'

import { api } from "../services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IActionResponse } from "./types";

export async function loginAction(_: IActionResponse, formData: FormData): Promise<IActionResponse> {
  const email = formData.get("email");
  const senha = formData.get("senha");

  try {
    const response = await api.post("/auth/login", {
      email,
      senha,
    });

    const token = response.data.access_token;

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });


  } catch (error: any) {
    console.log("Login error:", error);
        console.log(error.response?.data);

    return {
      success: false,
      errorMessage:
        error.response?.data?.mensagem ||
        "Erro ao fazer login",
    };
  }

  redirect("/pages");
  
}

export async function sendRecoveryCodeAction(
  _: IActionResponse,
  formData: FormData
): Promise<IActionResponse> {
  try {
    await api.post("/auth/esqueci-senha", {
      email: formData.get('emailRecovery'),
    });

    return {
      success: true,
      successMessage: "Código enviado por email com sucesso",
    };

  } catch (error: any) {
    console.log("Error sending password:", error);
        console.log(error.response?.data);
    return {
      success: false,
      errorMessage:
        error.response?.data?.mensagem?.[0] ||
        "Erro ao enviar a senha",
    };
  }
}

export async function passwordRecovery(
  _: IActionResponse,
  formData: FormData
): Promise<IActionResponse> {
  try {
    await api.post("/auth/redefinir-senha", {
      email: formData.get('emailForRecovery'),
      codigo: formData.get('code'),
      nova_senha: formData.get('newPassword'),
      confirmacao_senha: formData.get('passValidation')
    });

    return {
      success: true,
      successMessage: "Senha recuperada com sucesso",
    };

  } catch (error: any) {
    console.log("Error recovering password:", error);
    console.log(error.response?.data);
    return {
      success: false,
      errorMessage:
        error.response?.data?.mensagem ||
        "Erro ao recuperar a senha",
    };
  }
}