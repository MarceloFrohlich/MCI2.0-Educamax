//loga só fora de produção, pra não despejar dados da api nos logs do host
export function logDev(...args: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
        console.log(...args);
    }
}

export function getErrorMessage(
    error: any,
    fallback = "Erro inesperado"
): string {

    logDev(
        "API ERROR:",
        error?.response?.data || error
    );

    const backendMessage =
        error?.response?.data?.mensagem ||
        error?.response?.data?.message;

    if (Array.isArray(backendMessage)) {
        return backendMessage.join(", ");
    }

    return backendMessage || fallback;
}
