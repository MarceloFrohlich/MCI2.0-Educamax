'use client'
import { Button } from "../../../components/ui/button"

interface IFormSubmitButtonProps {
    pending: boolean
    isEditMode: boolean
    actionText: string
}

const FormSubmitButton: React.FC<
    IFormSubmitButtonProps
> = ({
    isEditMode, pending, actionText
}) => {
        return (
            <Button
                disabled={pending}
                className="
                            hover:cursor-pointer
                            bg-(--colorVariantBlue)
                            text-white
                            hover:bg-(--colorVariantBlue)/80
                            duration-300
                            border-none
                            mt-4
                        "
                type="submit"
            >
                {pending
                    ? "Salvando..."
                    : isEditMode
                        ? "Salvar Alterações"
                        : `${actionText}`
                }
            </Button>
        )

    }

export default FormSubmitButton