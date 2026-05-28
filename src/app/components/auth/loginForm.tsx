'use client'

import Link from "next/link"
import { CiMail } from "react-icons/ci"
import { FaLock } from "react-icons/fa"
import { loginAction } from "../../actions/auth";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { IActionResponse } from "../../actions/types";

interface ILoginForm {
    changeState: () => void
}

const LoginForm: React.FC<ILoginForm> = ({ changeState }) => {
    const initialState: IActionResponse = {
        success: undefined,
    };

    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState
    );

    useEffect(() => {
        if (state.success === true && state.successMessage) {
            toast.success(state.success === true && state.successMessage);
            return
        }

        if (state.success === false && state.errorMessage) {
            toast.error(state.success === false && state.errorMessage);
        }
    }, [state.success,
    state.successMessage,
    state.errorMessage]);

    return (
        <form action={formAction} className="h-full flex flex-col justify-around">
            <div className="flex flex-col gap-0">
                <h1 className="text-lg font-bold">Bem vindo!</h1>
                <p>Faça o seu login.</p>
            </div>

            <div className="flex flex-col gap-3 text-(--textBaseColor)">
                <div className="relative">
                    <input
                        className="
                peer
                bg-white
                w-full
                rounded-3xl
                py-2
                ps-12
                placeholder:text-slate-400
                hover:placeholder:text-(--colorVariantBlue)
                focus:placeholder:text-(--colorVariantBlue)
                focus:outline-none
                transition-colors
              "
                        type="text"
                        name="email"
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
                placeholder:text-slate-400
                hover:placeholder:text-(--colorVariantBlue)
                focus:placeholder:text-(--colorVariantBlue)
                focus:outline-none
                transition-colors
              "
                        type='password'
                        name='senha'
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
                disabled={pending}
                type="submit"
                className="bg-(--colorVariantBlue) w-full rounded-3xl text-white py-2 cursor-pointer"
            >{pending ? "Entrando..." : "Login"}</button>

            <Link onClick={changeState} href="#" className="text-center text-(--primaryText)">Esqueci a minha senha</Link>
        </form>
    )
}

export default LoginForm