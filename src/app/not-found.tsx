import Link from "next/link";

const NotFound = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-6 bg-[linear-gradient(90deg,#DEE9EF_0%,#E4EBF1_98%)] text-(--textBaseColor)">
            <h1 className="text-6xl font-bold text-(--textBaseColor)/25">404</h1>

            <div className="text-center">
                <p className="font-semibold">Página não encontrada</p>
                <small className="text-(--textBaseColor)/60">O endereço acessado não existe ou foi movido.</small>
            </div>

            <Link
                href="/pages"
                className="px-8 py-2 rounded-3xl bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 shadow-md"
            >
                Voltar ao início
            </Link>
        </section>
    );
};

export default NotFound;
