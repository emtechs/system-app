import { z } from 'zod'

export const loginSchema = z
  .object({
    login: z
      .string({ required_error: 'Usuário obrigatório' })
      .min(11, 'Precisa ter 11 números'),
    password: z
      .string({ required_error: 'Senha obrigatória' })
      .min(1, 'Senha obrigatória'),
  })
  .refine((fields) => (fields.login = fields.login.replace(/\D/g, '')))

export const recoverySchema = z
  .object({
    login: z
      .string({ required_error: 'Usuário obrigatório' })
      .min(11, 'Precisa ter 11 números'),
  })
  .refine((fields) => (fields.login = fields.login.replace(/\D/g, '')))

export const passwordVerifySchema = z.object({
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(1, 'Senha obrigatória'),
})
