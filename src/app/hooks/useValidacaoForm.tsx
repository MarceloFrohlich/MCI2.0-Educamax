'use client'

import { useState } from 'react'
import { ZodType } from 'zod'

type Erros = Record<string, string>

// valida o form com o schema antes da server action: se reprovar,
// bloqueia o envio e devolve a mensagem de cada campo para o ErroCampo
export function useValidacaoForm(schema: ZodType, camposMultiplos: string[] = []) {
    const [erros, setErros] = useState<Erros>({})

    const validar = (e: React.FormEvent<HTMLFormElement>) => {
        const fd = new FormData(e.currentTarget)
        const dados: Record<string, unknown> = Object.fromEntries(fd)
        camposMultiplos.forEach(campo => { dados[campo] = fd.getAll(campo) })

        const resultado = schema.safeParse(dados)
        if (resultado.success) {
            setErros({})
            return
        }

        e.preventDefault()
        const novos: Erros = {}
        resultado.error.issues.forEach(issue => {
            const campo = String(issue.path[0] ?? '')
            if (!novos[campo]) novos[campo] = issue.message
        })
        setErros(novos)
    }

    const limparErros = () => setErros({})

    return { erros, validar, limparErros }
}
