import { z } from 'zod'
import { numero } from './campos'

export const avaliacaoSchema = z.object({
    valor: numero,
})
