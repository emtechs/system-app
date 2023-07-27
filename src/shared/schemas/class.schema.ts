import { z } from 'zod'

export const classCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .nonempty('Nome obrigatório'),
})

export const classSchoolCreateSchema = z
  .object({
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
    year_id: z.string().uuid(),
  })
  .refine((fields) => (fields.class_id = fields.class.id))
  .refine((fields) => (fields.school_id = fields.school.id))

export const classStudentCreateSchema = z
  .object({
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
    year_id: z.string().uuid(),
    student_id: z.string().uuid(),
  })
  .refine((fields) => (fields.class_id = fields.class.id))
  .refine((fields) => (fields.school_id = fields.school.id))
