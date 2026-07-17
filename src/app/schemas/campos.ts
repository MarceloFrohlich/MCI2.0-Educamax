import { z } from 'zod'

// blocos base para os schemas: FormData entrega tudo como string,
// então número/inteiro validam a string antes da conversão
export const obrigatorio = z.string({ error: '* Campo obrigatório' }).trim().min(1, '* Campo obrigatório')

export const email = obrigatorio
    .refine(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'E-mail inválido')

export const numero = obrigatorio
    .refine(v => !isNaN(Number(v)), 'Informe um número válido')

export const inteiro = numero
    .refine(v => Number.isInteger(Number(v)), 'Informe um número inteiro')

export const numeroOpcional = z.string().trim()
    .refine(v => v === '' || !isNaN(Number(v)), 'Informe um número válido')
    .optional()
