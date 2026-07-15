// app/actions/auth.ts
'use server'

import { api } from "../services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IActionResponse } from "./types";
import { ISessao } from "../types/auth/auth";

export async function loginAction(_: IActionResponse, formData: FormData): Promise<IActionResponse> {
  const email = formData.get("email");
  const senha = formData.get("senha");

  try {
    const response = await api.post("/auth/login", {
      email,
      senha,
    });

    const token = response.data.access_token;
    const usuario = response.data.usuario;

    const sessao: ISessao = {
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      id_role: usuario.id_role,
      id_nivel: usuario.id_nivel,
      relacao: usuario.relacao,
      ano_ativo: usuario.ano_ativo,
    };

    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    } as const;

    cookieStore.set("token", token, cookieOptions);
    cookieStore.set("sessao", JSON.stringify(sessao), cookieOptions);

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

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("sessao");

  redirect("/");
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