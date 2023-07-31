import { z } from 'zod'

export const createYearSchema = z.object({
  year: z
    .string({ required_error: 'Ano Letivo obrigatório' })
    .nonempty('Ano Letivo obrigatório'),
})

export const periodUpdateSchema = z.object({
  initial: z
    .string({ required_error: 'Início obrigatório' })
    .nonempty('Início obrigatório'),
  final: z
    .string({ required_error: 'Fim obrigatório' })
    .nonempty('Fim obrigatório'),
})

export const createPeriodSchema = periodUpdateSchema.extend({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .nonempty('Nome obrigatório'),
  category: z
    .string({ required_error: 'Categoria obrigatória' })
    .nonempty('Categoria obrigatória'),
})
