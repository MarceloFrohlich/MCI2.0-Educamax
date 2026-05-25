"use client";
import React, { useState } from "react";
import logo from '../../../public/images/logoMci.svg'
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { SlBell } from "react-icons/sl";
import Sidebar from "../components/utils/sidebar/sidebar";

interface IMain {
    children: React.ReactNode;
}

const Main: React.FC<IMain> = ({ children }) => {

    return (
        <section className="bg-[linear-gradient(90deg,#DEE9EF_0%,#E4EBF1_98%)] h-screen no-scrollbar relative text-(--textBaseColor)">

            <div className="flex flex-col h-30 fixed w-full z-50">
                <header className="px-5 pt-5 flex justify-between w-full">
                    <Image src={logo} alt="logo" width={39} height={17} />

                    <div className="flex bg-[#F1FAFF] rounded-lg py-2 px-4 gap-4 justify-around shadow-xl">
                        <CiUser className="text-xl hover:cursor-pointer" />
                        <SlBell className="text-xl hover:cursor-pointer" />
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

            <Sidebar />
            <section className=" bg-[linear-gradient(90deg,#DEE9EF_0%,#E4EBF1_98%)] ps-24 w-full absolute top-16">
                    {children}
            </section>
        </section>
    );
};

export default Main;
