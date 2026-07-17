import { z } from 'zod'
import { inteiro, numero, numeroOpcional, obrigatorio } from './campos'

export const copaSchema = z.object({
    cupName: obrigatorio,
    leader: obrigatorio,
    verbo: obrigatorio,
    medida: obrigatorio,
    de: numero,
    para: numero,
    start_date: obrigatorio,
    end_date: obrigatorio,
    departamentos: z.array(z.string()).min(1, 'Selecione ao menos um departamento'),
})

export const jogoSchema = z.object({
    gameName: obrigatorio,
    inicio: obrigatorio,
    fim: obrigatorio,
    de: numeroOpcional,
    para: numeroOpcional,
    selectedCopas: z.array(z.string()).min(1, 'Selecione ao menos uma copa'),
})

export const liderSchema = z.object({
    newleader: obrigatorio,
})

// valida o estado controlado dos forms de medida (createEditPrevidencia e directionMeasuresModal)
export const medidaSchema = z.object({
    verbo: z.string().optional(),
    unidade_medida: z.string().optional(),
    placar_desejado: inteiro,
    data_inicio: obrigatorio,
    data_fim: obrigatorio,
    excluir_periodo: z.boolean().optional(),
    inativo_de: z.string().optional(),
    inativo_ate: z.string().optional(),
}).superRefine((dados, ctx) => {
    // o período inativo anda em par: preencheu um lado, o outro vira obrigatório
    if (dados.inativo_de && !dados.inativo_ate) {
        ctx.addIssue({ code: 'custom', path: ['inativo_ate'], message: '* Campo obrigatório' })
    }
    if (dados.inativo_ate && !dados.inativo_de) {
        ctx.addIssue({ code: 'custom', path: ['inativo_de'], message: '* Campo obrigatório' })
    }
})
