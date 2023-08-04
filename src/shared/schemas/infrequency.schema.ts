import { z } from 'zod'

export const reportSchema = z.object({
  type: z
    .string({
      required_error: 'Modelo obrigatório',
    })
    .nonempty('Modelo obrigatório'),
  year: z.object(
    { id: z.string().uuid() },
    {
      required_error: 'Ano Letivo obrigatório',
      invalid_type_error: 'Ano Letivo obrigatório',
    },
  ),
  period: z.object(
    { id: z.string().uuid() },
    {
      required_error: 'Período obrigatório',
      invalid_type_error: 'Período obrigatório',
    },
  ),
  period_id: z.string().uuid().optional(),
})

export const reportSchoolSchema = reportSchema
  .extend({
    model: z
      .string({
        required_error: 'Tipo obrigatório',
      })
      .nonempty('Tipo obrigatório'),
    school_id: z.string(),
    year_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.period_id = field.period.id))
  .refine((field) => (field.year_id = field.year.id))

export const reportClassSchema = reportSchema
  .extend({
    class: z.object(
      { key: z.string().uuid() },
      {
        required_error: 'Turma obrigatória',
        invalid_type_error: 'Turma obrigatória',
      },
    ),
    key_class: z.string().uuid().optional(),
  })
  .refine((field) => (field.key_class = field.class.key))
  .refine((field) => (field.period_id = field.period.id))

export const reportStudentSchema = reportSchema
  .extend({
    class: z.object(
      { key: z.string().uuid() },
      {
        required_error: 'Turma obrigatória',
        invalid_type_error: 'Turma obrigatória',
      },
    ),
    key_class: z.string().uuid().optional(),
    student: z.object(
      { id: z.string().uuid() },
      {
        required_error: 'Aluno obrigatório',
        invalid_type_error: 'Aluno obrigatório',
      },
    ),
    student_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.student_id = field.student.id))
  .refine((field) => (field.period_id = field.period.id))
  .refine((field) => (field.key_class = field.class.key))

export const reportCustomSchema = z.object({
  type: z
    .string({
      required_error: 'Modelo obrigatório',
    })
    .nonempty('Modelo obrigatório'),
  year: z.object(
    { id: z.string().uuid() },
    {
      required_error: 'Ano Letivo obrigatório',
      invalid_type_error: 'Ano Letivo obrigatório',
    },
  ),
  initial: z
    .string({ required_error: 'Início obrigatório' })
    .nonempty('Início obrigatório'),
  final: z
    .string({ required_error: 'Fim obrigatório' })
    .nonempty('Fim obrigatório'),
})

export const reportCustomSchoolSchema = reportCustomSchema
  .extend({
    model: z
      .string({
        required_error: 'Tipo obrigatório',
      })
      .nonempty('Tipo obrigatório'),
    school_id: z.string(),
    year_id: z.string().uuid().optional(),
  })

  .refine((field) => (field.year_id = field.year.id))

export const reportCustomClassSchema = reportCustomSchema
  .extend({
    class: z.object(
      { key: z.string().uuid() },
      {
        required_error: 'Turma obrigatória',
        invalid_type_error: 'Turma obrigatória',
      },
    ),
    key_class: z.string().uuid().optional(),
  })
  .refine((field) => (field.key_class = field.class.key))

export const reportCustomStudentSchema = reportCustomSchema
  .extend({
    class: z.object(
      { key: z.string().uuid() },
      {
        required_error: 'Turma obrigatória',
        invalid_type_error: 'Turma obrigatória',
      },
    ),
    key_class: z.string().uuid().optional(),
    student: z.object(
      { id: z.string().uuid() },
      {
        required_error: 'Aluno obrigatório',
        invalid_type_error: 'Aluno obrigatório',
      },
    ),
    student_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.student_id = field.student.id))
  .refine((field) => (field.key_class = field.class.key))
