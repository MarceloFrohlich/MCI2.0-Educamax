'use client'

import { useActionState, useEffect, useState } from "react";
import { passwordRecovery } from "../../actions/auth";
import { toast } from "sonner";
import { CiMail } from "react-icons/ci";
import { IActionResponse } from "../../actions/types";
import CriteriosSenha, { senhaAtendeCriterios } from "../utils/criteriosSenha";

interface IPasswordRecovery {
    email: string
    resetStates: () => void
}

const PasswordRecovery: React.FC<IPasswordRecovery> = ({ email, resetStates }) => {

    const initialState:IActionResponse = {
        success: undefined,
    };

    const [state, formAction, pending] = useActionState(
        passwordRecovery,
        initialState
    );

    const [senha, setSenha] = useState('');
    const [senhaEmFoco, setSenhaEmFoco] = useState(false);

    useEffect(() => {
        if (state.success === true && state.successMessage) {
            toast.success(state.success === true && state.successMessage);
            resetStates()
            return;
        }

        if (state.success === false && state.errorMessage) {
            toast.error(state.success === false && state.errorMessage);
        }
    }, [state.success,
    state.successMessage,
    state.errorMessage]);


    return (
        <form action={formAction} className="flex-1 flex flex-col justify-around">
            <div className="flex flex-col gap-0">
                <h1 className="text-lg font-bold">Recuperação de senha</h1>
            </div>

            <div className="flex flex-col gap-3 text-(--textBaseColor)">
                <input
                    type="hidden"
                    name="emailForRecovery"
                    value={email}
                />

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
                        name="code"
                        placeholder="Digite o código recebido por email"
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
                        type="password"
                        name="newPassword"
                        placeholder="Nova senha"
                        autoComplete="new-password"
                        value={senha}
                        onChange={evento => setSenha(evento.target.value)}
                        onFocus={() => setSenhaEmFoco(true)}
                        onBlur={() => setSenhaEmFoco(false)}
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
                <CriteriosSenha senha={senha} visivel={senhaEmFoco} />
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
                        type="password"
                        name="passValidation"
                        placeholder="Repita sua senha"
                        autoComplete="new-password"
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
            </div>

            <button
                disabled={pending || !senhaAtendeCriterios(senha)}
                type="submit"
                className="bg-(--colorVariantBlue) w-full rounded-3xl text-white py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >{pending ? "Alterando..." : "Alterar"}</button>
        </form>
    )
}

export default PasswordRecovery