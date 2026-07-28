import React from "react";
import logo from '../../../public/images/logoMci.svg'
import Image from "next/image";
import Sidebar from "../components/utils/sidebar/sidebar";
import UserMenu from "../components/utils/userMenu";
import SeletorAno from "../components/utils/seletorAno";
import { getSessao } from "../services/sessao";
import { getAnosDisponiveis } from "../actions/auth";

interface IMain {
    children: React.ReactNode;
}

const Main = async ({ children }: IMain) => {

    const sessao = await getSessao();
    const anos = sessao ? await getAnosDisponiveis() : [];

    return (
        <section className="bg-[linear-gradient(90deg,#DEE9EF_0%,#E4EBF1_98%)] h-screen no-scrollbar relative text-(--textBaseColor)">

            <div className="flex flex-col h-30 fixed w-full z-50">
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

            <Sidebar sessao={sessao} />
            <section className=" bg-[linear-gradient(90deg,#DEE9EF_0%,#E4EBF1_98%)] ps-20 sm:ps-24 w-full absolute top-30">
                    {children}
            </section>
        </section>
    );
};

export default Main;
