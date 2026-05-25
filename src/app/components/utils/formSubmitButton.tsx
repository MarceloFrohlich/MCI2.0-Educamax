'use client'

import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Oval } from 'react-loader-spinner'
import { Button } from "../../../components/ui/button"

interface IFormSubmitButtonProps {
    action?: string
    waitingText?: string
    onClick?: () => void
    disabled?: boolean
    rounded?: boolean
    bold?: boolean
    className?: string
}

const FormSubmitButton: React.FC<
    IFormSubmitButtonProps
> = ({
    action = 'Salvar',
    waitingText = 'Salvando...',
    onClick,
    disabled = false,
    rounded = true,
    bold = true,
    className = '',
}) => {

        const { pending } = useFormStatus()

        return (

            <Button
                type="submit"
                disabled={disabled || pending}
                onClick={onClick}
                className={`
                normal-case
                bg-(--colorVariantBlue)
                w-fit
                px-4
                py-3
                shadow-none
                tracking-wider
                duration-300
                hover:shadow-lg
                hover:cursor-pointer
                disabled:opacity-70
                ${rounded ? 'rounded-lg!' : ''}
                ${bold ? 'font-semibold!' : ''}
                ${className}
            `}
            >

                {pending ? (
                    <>
                        <span className="animate-pulse">{waitingText}</span>
                        <Oval
                            visible={true}
                            ariaLabel="oval-loading"
                            color="#facc15"
                            secondaryColor="#fef08a"
                            height={18}
                            width={18}
                            strokeWidth={6}
                        />
                    </>
                ) : (
                    <>{action}</>
                )}

            </Button>

        )

    }

export default FormSubmitButton