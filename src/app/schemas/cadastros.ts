import { z } from 'zod'
import { email, obrigatorio } from './campos'

// nomes dos campos espelham os name= dos formulários

export const usuarioSchema = z.object({
    nome: obrigatorio,
    email: email,
    nivelUsuario: obrigatorio,
    nivelPermissao: obrigatorio,
    relacao: z.string().optional(),
}).superRefine((dados, ctx) => {
    // o vínculo só existe depois de escolher o nível de permissão
    if (dados.nivelPermissao && !dados.relacao?.trim()) {
        ctx.addIssue({ code: 'custom', path: ['relacao'], message: '* Campo obrigatório' })
    }
})

export const franqueadoraSchema = z.object({
    nome: obrigatorio,
})

export const filialSchema = z.object({
    id_franqueadora: obrigatorio,
    nome: obrigatorio,
})

export const departamentoSchema = z.object({
    id_filial: obrigatorio,
    departamento: obrigatorio,
})
