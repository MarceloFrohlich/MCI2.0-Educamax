'use client'

import Image from "next/image";
import logo from "../../../../public/images/logoMci.svg";
import { useState } from "react";
import SendRecoveryCode from "./sendRecoveryCode";
import LoginForm from "./loginForm";
import PasswordRecovery from "./passwordRecovery";

export default function Login() {

  const [passwordRecovery, setPasswordRecovery] = useState<boolean>(false)
  const [passwordSent, setPasswordSent] = useState<boolean>(false)
  const [emailRecovery, setEmailRecovery] = useState('')

  function resetStates() {
    setPasswordRecovery(false)
    setPasswordSent(false)
  }

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
      <div className="h-2/3 w-1/4 bg-[#EEEEEE] rounded-3xl p-6 flex flex-col justify-between">
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

        {!passwordRecovery && !passwordSent && (
          <LoginForm changeState={() => setPasswordRecovery(true)} />
        )}

        {passwordRecovery && !passwordSent && (
          <SendRecoveryCode
            returnState={() => setPasswordRecovery(false)}
            changeState={() => setPasswordSent(true)}
            email={emailRecovery}
            setEmail={setEmailRecovery}
          />
        )}

        {passwordRecovery && passwordSent && (
          <PasswordRecovery email={emailRecovery} resetStates={resetStates} />
        )}

      </div>
    </section >
  );
}
