import { z } from 'zod'
import { csvSchema } from './file.schema'

export const schoolCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome da Escola obrigatório' })
    .nonempty('Nome da Escola obrigatório'),
})

export const schoolClassCreateSchema = z.object({
  classes: z.object({ id: z.string().uuid() }).array(),
})

export const schoolImportSchema = z.object({
  file: csvSchema,
})

export const schoolUpdateSchema = z.object({
  name: z
    .string({ required_error: 'Nome da Escola obrigatório' })
    .nonempty('Nome da Escola obrigatório'),
})

export const schoolUpdateDirectorSchema = z
  .object({
    login: z.string(),
    cpf: z
      .string({ required_error: 'CPF obrigatório' })
      .min(14, 'Precisa ter 14 digitos'),
    name_diret: z
      .string({ required_error: 'Nome obrigatório' })
      .nonempty('Nome obrigatório'),
    password: z.string().optional(),
    role: z.enum(['SERV', 'DIRET', 'SECRET', 'ADMIN']).default('DIRET'),
    dash: z.enum(['COMMON', 'SCHOOL', 'ORGAN', 'ADMIN']).default('SCHOOL'),
  })
  .refine((fields) => (fields.password = fields.login.substring(0, 6)))

export const serverCreateSchema = z
  .object({
    name: z
      .string({ required_error: 'Nome obrigatório' })
      .nonempty('Nome obrigatório'),
    login: z.string(),
    cpf: z
      .string({ required_error: 'CPF obrigatório' })
      .min(14, 'Precisa ter 14 digitos'),
    password: z.string().optional(),
  })
  .refine((fields) => (fields.password = fields.login.substring(0, 6)))

export const studentCreateSchema = z
  .object({
    name: z
      .string({ required_error: 'Nome obrigatório' })
      .nonempty('Nome obrigatório'),
    registry: z
      .string({ required_error: 'Matricula obrigatória' })
      .nonempty('Matricula obrigatória'),
    class: z.object(
      { id: z.string().uuid() },
      { required_error: 'Turma obrigatória' },
    ),
    school: z.object(
      { id: z.string().uuid() },
      { required_error: 'Escola obrigatório' },
    ),
    class_id: z.string().uuid().optional(),
    school_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.class_id = field.class.id))
  .refine((field) => (field.school_id = field.school.id))

export const studentImportSchema = z
  .object({
    file: csvSchema,
    class: z.object(
      { id: z.string().uuid() },
      { required_error: 'Turma obrigatória' },
    ),
    class_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.class_id = field.class.id))
