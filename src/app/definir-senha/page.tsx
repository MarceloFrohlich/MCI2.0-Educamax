import DefinirSenhaForm from "../components/auth/definirSenhaForm";

const DefinirSenha = async ({
    searchParams,
}: {
    searchParams: Promise<{ email?: string, codigo?: string }>
}) => {

    const { email, codigo } = await searchParams;

    return <DefinirSenhaForm email={email ?? ''} codigo={codigo ?? ''} />;
};

export default DefinirSenha;
