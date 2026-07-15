'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiLogout, CiUser } from "react-icons/ci";
// import { SlBell } from "react-icons/sl";
import { logoutAction } from "../../actions/auth";
import { ISessao } from "../../types/auth/auth";

const UserMenu: React.FC<{ sessao: ISessao | null }> = ({ sessao }) => {
    const [aberto, setAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!aberto) return;

        const aoClicarFora = (evento: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(evento.target as Node)) {
                setAberto(false);
            }
        };
        const aoTeclar = (evento: KeyboardEvent) => {
            if (evento.key === 'Escape') setAberto(false);
        };

        document.addEventListener('mousedown', aoClicarFora);
        window.addEventListener('keydown', aoTeclar);
        return () => {
            document.removeEventListener('mousedown', aoClicarFora);
            window.removeEventListener('keydown', aoTeclar);
        };
    }, [aberto]);

    return (
        <div ref={menuRef} className="relative">
            <div
                onClick={() => setAberto(!aberto)}
                className="flex bg-[#F1FAFF] rounded-lg py-2 px-4 gap-4 justify-around shadow-xl hover:cursor-pointer"
            >
                <CiUser className="text-xl" />
                {/* <SlBell className="text-xl hover:cursor-pointer" /> */}
            </div>

            {aberto && (
                <div className="absolute right-0 top-11 w-56 bg-[#F0F4F9] rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                    {sessao && (
                        <div className="px-4 py-3 border-b border-slate-200">
                            <p className="text-sm font-semibold truncate">{sessao.nome}</p>
                        </div>
                    )}

                    <Link
                        href="/pages/perfil"
                        onClick={() => setAberto(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/60 transition"
                    >
                        <CiUser className="size-5" />
                        Meu perfil
                    </Link>

                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition hover:cursor-pointer"
                        >
                            <CiLogout className="size-5" />
                            Sair
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
