export function getErrorMessage(
    error: any,
    fallback = "Erro inesperado"
): string {

    console.log(
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