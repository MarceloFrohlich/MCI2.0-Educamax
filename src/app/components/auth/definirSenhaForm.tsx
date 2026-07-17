'use client'

import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logoMci.svg";
import { useActionState, useState } from "react";
import { FaLock } from "react-icons/fa";
import { passwordRecovery } from "../../actions/auth";
import { IActionResponse } from "../../actions/types";
import CriteriosSenha, { senhaAtendeCriterios } from "../utils/criteriosSenha";
import { useValidacaoForm } from "../../hooks/useValidacaoForm";
import { definirSenhaSchema } from "../../schemas/auth";
import ErroCampo from "../utils/erroCampo";

interface IDefinirSenhaForm {
    email: string
    codigo: string
}

const DefinirSenhaForm: React.FC<IDefinirSenhaForm> = ({ email, codigo }) => {

    const initialState: IActionResponse = {
        success: undefined,
    };

    const [state, formAction, pending] = useActionState(
        passwordRecovery,
        initialState
    );

    const { erros, validar } = useValidacaoForm(definirSenhaSchema);

    const [senha, setSenha] = useState('');
    const [senhaEmFoco, setSenhaEmFoco] = useState(false);

    const linkInvalido = !email || !codigo;

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
            <div className="w-[90%] sm:w-2/3 lg:w-2/5 xl:w-1/4 bg-[#EEEEEE] rounded-3xl p-6 flex flex-col gap-6">
                <div className="flex gap-6 justify-center items-center">
                    <Image src={logo} alt="logo" width={111} height={49.5} />
                </div>

                {linkInvalido && (
                    <div className="text-center flex flex-col gap-4">
                        <h1 className="text-lg font-bold">Convite inválido</h1>
                        <p className="text-sm text-(--textBaseColor)/70">
                            Este link de convite está incompleto ou expirado.
                            Solicite um novo convite ao administrador do sistema.
                        </p>
                    </div>
                )}

                {!linkInvalido && state.success && (
                    <div className="text-center flex flex-col gap-4">
                        <h1 className="text-lg font-bold">Senha definida com sucesso! 🎉</h1>
                        <p className="text-sm text-(--textBaseColor)/70">
                            Sua conta está pronta. Faça o login com o seu e-mail e a senha que você acabou de criar.
                        </p>
                        <Link
                            href="/"
                            className="bg-(--colorVariantBlue) w-full rounded-3xl text-white py-2 hover:bg-(--colorVariantBlue)/80 duration-300"
                        >
                            Ir para o login
                        </Link>
                    </div>
                )}

                {!linkInvalido && !state.success && (
                    <form action={formAction} onSubmit={validar} noValidate className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-lg font-bold">Bem-vindo ao MCI!</h1>
                            <p className="text-sm text-(--textBaseColor)/70">
                                Defina a sua senha de acesso para a conta <strong>{email}</strong>.
                            </p>
                        </div>

                        <input type="hidden" name="emailForRecovery" value={email} />
                        <input type="hidden" name="code" value={codigo} />

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
                            <FaLock
                                className="
                                    absolute
                                    top-3
                                    left-4
                                    text-slate-400
                                    pointer-events-none
                                    transition-colors
                                    peer-hover:text-(--colorVariantBlue)
                                    peer-focus:text-(--colorVariantBlue)
                                "
                            />
                        </div>

                        <CriteriosSenha senha={senha} visivel={senhaEmFoco} />

                        <ErroCampo erro={erros.newPassword} />

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
                            <FaLock
                                className="
                                    absolute
                                    top-3
                                    left-4
                                    text-slate-400
                                    pointer-events-none
                                    transition-colors
                                    peer-hover:text-(--colorVariantBlue)
                                    peer-focus:text-(--colorVariantBlue)
                                "
                            />
                        </div>

                        <ErroCampo erro={erros.passValidation} />

                        {state.success === false && state.errorMessage && (
                            <p className="text-sm text-red-600 text-center">{state.errorMessage}</p>
                        )}

                        <button
                            disabled={pending || !senhaAtendeCriterios(senha)}
                            type="submit"
                            className="bg-(--colorVariantBlue) w-full rounded-3xl text-white py-2 cursor-pointer hover:bg-(--colorVariantBlue)/80 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {pending ? "Salvando..." : "Definir senha"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default DefinirSenhaForm;
