'use client'

import { CiMail } from "react-icons/ci"
import { sendRecoveryCodeAction } from "../../actions/auth";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const SendRecoveryCode: React.FC = () => {

    const initialState = {
        success: false,
        message: "",
    };

    const [state, formAction, pending] = useActionState(
        sendRecoveryCodeAction,
        initialState
    );

    useEffect(() => {
        if (state.success) {
          toast.success("Email enviado com sucesso");
        }
    
        if (state.message) {
          toast.error(state.message);
        }
      }, [state]);

    return (
        <form action={formAction} className="flex-1 flex flex-col justify-around">
            <div className="flex flex-col gap-0">
                <h1 className="text-lg font-bold">Recupere sua senha</h1>
            </div>

            <div className="flex flex-col gap-0">
                <p className="text-sm">Você receberá no seu email cadastrado um email com o código de recuperação valido por 15 minutos. </p>
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
                        name="emailRecovery"
                        placeholder="Digite seu email cadastrado"
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
                disabled={pending}
                type="submit"
                className="bg-(--colorVariantBlue) w-full rounded-3xl text-white py-2 cursor-pointer"
            >{pending ? "Enviando..." : "Recuperar"}</button>
        </form>
    )
}

export default SendRecoveryCode