import { z } from 'zod'
import { inteiro } from './campos'

const inteiroPlp = (v: string | undefined) =>
    v !== undefined && v.trim() !== '' && Number.isInteger(Number(v))

export const lancamentoSchema = z.object({
    tem_plp: z.string().optional(),
    realizado: inteiro,
    compromisso: inteiro,
    entrevistaqtd: z.string().optional(),
    promotores: z.string().optional(),
    neutros: z.string().optional(),
    detratores: z.string().optional(),
}).superRefine((dados, ctx) => {
    if (dados.tem_plp !== 'true') return

    const campos = ['entrevistaqtd', 'promotores', 'neutros', 'detratores'] as const
    let plpCompleto = true
    campos.forEach(campo => {
        if (!inteiroPlp(dados[campo])) {
            plpCompleto = false
            ctx.addIssue({ code: 'custom', path: [campo], message: '* Informe um número inteiro' })
        }
    })

    // regra do backend: promotores + neutros + detratores = entrevistas
    if (plpCompleto) {
        const soma = Number(dados.promotores) + Number(dados.neutros) + Number(dados.detratores)
        if (soma !== Number(dados.entrevistaqtd)) {
            ctx.addIssue({
                code: 'custom',
                path: ['entrevistaqtd'],
                message: 'A soma de promotores, neutros e detratores deve ser igual às entrevistas',
            })
        }
    }
})
