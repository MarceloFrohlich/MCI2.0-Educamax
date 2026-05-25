'use client'

import Image from "next/image";
import logo from "../../public/images/logoMci.svg";
import { CiMail } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <section
      className="
       text-(--textBaseColor)
        bg-[url('/images/loginBg.jpg')]
        bg-size-[125%]
        bg-position-[-350px_50%]
        bg-no-repeat
        bg-black/80
        bg-blend-multiply
        h-svh
        flex items-center justify-center
      "
    >
      <div className="h-2/3 w-1/4 bg-[#EEEEEE] rounded-3xl p-6 flex flex-col justify-around">
        <div className="flex gap-6 justify-center items-center">
          <Image src={logo} alt="logo" width={111} height={49.5} />

          <p
            className="
              relative
              my-4
              ps-6
              text-(--colorVariantBlue)
              leading-[1.1]
              tracking-tight
              overflow-hidden
            "
          >
            {/* Borda */}
            <span
              className="
                absolute
                left-0
                bottom-0
                w-1
                bg-(--colorVariantBlue)
                rounded-full
                animate-borderLoop
              "
            />

            {/* Texto */}
            <span className="block animate-textLoop">
              Metas <br />
              Crucialmente <br />
              Importantes
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-0">
          <h1 className="text-lg font-bold">Bem vindo!</h1>
          <p>Faça o seu login.</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              className="
                peer
                bg-white
                w-full
                rounded-3xl
                py-2
                ps-12
                text-(--primaryColor)
                placeholder:text-slate-400
                hover:placeholder:text-(--colorVariantBlue)
                focus:placeholder:text-(--colorVariantBlue)
                focus:outline-none
                transition-colors
              "
              type="text"
              placeholder="Seu email"
            />

            <CiMail
              className="
                absolute
                top-2.5
                left-4
                text-xl
                text-slate-400
                pointer-events-none
                transition-colors
                peer-hover:text-(--colorVariantBlue)
                peer-focus:text-(--colorVariantBlue)
              "
            />
          </div>

          <div className="relative">
            <input
              className="
                peer
                bg-white
                w-full
                rounded-3xl
                py-2
                ps-12
                text-(--primaryColor)
                placeholder:text-slate-400
                hover:placeholder:text-(--colorVariantBlue)
                focus:placeholder:text-(--colorVariantBlue)
                focus:outline-none
                transition-colors
              "
              type='text'
              placeholder="Senha"
            />
            <FaLock
              className="
                absolute
                top-2.5
                left-4
                text-xl
                text-slate-400
                pointer-events-none
                transition-colors
                peer-hover:text-(--colorVariantBlue)
                peer-focus:text-(--colorVariantBlue)
              "
            />
          </div>
        </div>

        <button
          onClick={() => redirect('/pages')}
          type="button"
          className="bg-(--colorVariantBlue) w-full rounded-3xl text-white py-2 cursor-pointer"
        >Login</button>

        <Link href="#" className="text-center text-(--primaryText)">Esqueci a minha senha</Link>
      </div>
    </section >
  );
}
