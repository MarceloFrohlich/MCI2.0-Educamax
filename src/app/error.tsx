'use client'

import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

const Error = ({ reset }: { error: Error, reset: () => void }) => {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-6 bg-[linear-gradient(90deg,#DEE9EF_0%,#E4EBF1_98%)] text-(--textBaseColor)">
            <FiAlertTriangle className="size-12 text-(--textYellowColor)" />

            <div className="text-center">
                <h1 className="text-xl font-semibold">Algo deu errado</h1>
                <p className="text-sm text-(--textBaseColor)/60 mt-1">
                    Não foi possível carregar esta página. Se o problema continuar, sua sessão pode ter expirado.
                </p>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-8 py-2 rounded-3xl bg-(--colorVariantBlue) text-white hover:bg-(--colorVariantBlue)/80 duration-300 hover:cursor-pointer shadow-md"
                >
                    Tentar novamente
                </button>

                <Link
                    href="/"
                    className="px-8 py-2 rounded-3xl bg-white hover:bg-slate-50 duration-300 shadow-md"
                >
                    Ir para o login
                </Link>
            </div>
        </section>
    );
};

export default Error;
