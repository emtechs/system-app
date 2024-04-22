import { z } from 'zod'

export const createYearSchema = z.object({
  year: z
    .string({ required_error: 'Ano Letivo obrigatório' })
    .min(1, 'Ano Letivo obrigatório'),
})

export const periodUpdateSchema = z.object({
  initial: z
    .string({ required_error: 'Início obrigatório' })
    .min(1, 'Início obrigatório'),
  final: z
    .string({ required_error: 'Fim obrigatório' })
    .min(1, 'Fim obrigatório'),
})

export const createPeriodSchema = periodUpdateSchema.extend({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .min(1, 'Nome obrigatório'),
  category: z
    .string({ required_error: 'Categoria obrigatória' })
    .min(1, 'Categoria obrigatória'),
})
