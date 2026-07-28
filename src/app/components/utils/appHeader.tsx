'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import logo from '../../../../public/images/logoMci.svg'
import SeletorAno from "./seletorAno";
import UserMenu from "./userMenu";
import { ISessao } from "../../types/auth/auth";

interface IAppHeader {
    sessao: ISessao | null;
    anos: number[];
}

// Mede a própria altura e publica em --app-header-height, pra quem depende de
// saber onde o header termina (conteúdo, sidebar) nunca ficar dessincronizado
// com uma altura fixa "no chute" — evita a faixa invisível de cliques perdidos
// que já aconteceu antes quando o header ganhou conteúdo novo (ex: SeletorAno).
const AppHeader: React.FC<IAppHeader> = ({ sessao, anos }) => {
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elemento = headerRef.current;
        if (!elemento) return;

        const atualizarAltura = () => {
            document.documentElement.style.setProperty('--app-header-height', `${elemento.offsetHeight}px`);
        };

        atualizarAltura();

        const observer = new ResizeObserver(atualizarAltura);
        observer.observe(elemento);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={headerRef} className="flex flex-col fixed w-full z-50">
            <header className="px-5 pt-5 flex justify-between items-center w-full">
                <Image src={logo} alt="logo" width={39} height={17} />

                <div className="flex items-center gap-4">
                    {sessao && <SeletorAno anoAtivo={sessao.ano_ativo} anos={anos} />}
                    <UserMenu sessao={sessao} />
                </div>
            </header>
            <div>
                <span className="block text-[9px] leading-2.5 ms-5 text-(--colorVariantBlue) font-bold py-5 ">
                    Metas <br />
                    Crucialmente <br />
                    Importantes
                </span>
            </div>
        </div>
    );
};

export default AppHeader;
