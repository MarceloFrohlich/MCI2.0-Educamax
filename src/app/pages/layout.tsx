import React from "react";
import Sidebar from "../components/utils/sidebar/sidebar";
import AppHeader from "../components/utils/appHeader";
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

            <AppHeader sessao={sessao} anos={anos} />

            <Sidebar sessao={sessao} />
            <section
                className=" bg-[linear-gradient(90deg,#DEE9EF_0%,#E4EBF1_98%)] ps-20 sm:ps-24 w-full absolute top-[var(--app-header-height,7.5rem)]"
            >
                    {children}
            </section>
        </section>
    );
};

export default Main;
