import { z } from 'zod'
import { email, obrigatorio } from './campos'

export const loginSchema = z.object({
    email: email,
    senha: obrigatorio.refine(v => v.length >= 6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const recuperarSenhaSchema = z.object({
    emailRecovery: email,
})

// recuperação e definição de senha usam a mesma action; os critérios da senha
// já são cobertos em tempo real pelo criteriosSenha — aqui valida código e confirmação
export const redefinirSenhaSchema = z.object({
    code: obrigatorio.refine(v => v.length >= 6, 'Código inválido'),
    newPassword: obrigatorio,
    passValidation: obrigatorio,
}).superRefine((dados, ctx) => {
    if (dados.newPassword && dados.passValidation && dados.newPassword !== dados.passValidation) {
        ctx.addIssue({ code: 'custom', path: ['passValidation'], message: 'As senhas não coincidem' })
    }
})

export const definirSenhaSchema = z.object({
    newPassword: obrigatorio,
    passValidation: obrigatorio,
}).superRefine((dados, ctx) => {
    if (dados.newPassword && dados.passValidation && dados.newPassword !== dados.passValidation) {
        ctx.addIssue({ code: 'custom', path: ['passValidation'], message: 'As senhas não coincidem' })
    }
})
