import dayjs from 'dayjs'
import { z } from 'zod'

export const frequencyCreateSchema = z
  .object({
    date: z
      .string({
        required_error: 'Por favor, selecione uma data no calendário.',
      })
      .nonempty('Por favor, selecione uma data no calendário.'),
    class: z.object(
      {
        id: z.string().uuid(),
        students: z.object({ id: z.string().uuid() }).array(),
        school: z.object({ id: z.string().uuid() }),
      },
      {
        required_error: 'Turma obrigatória',
        invalid_type_error: 'Turma obrigatória',
      },
    ),
    class_id: z.string().uuid().optional(),
    school_id: z.string().uuid().optional(),
    year_id: z.string().uuid(),
    students: z.object({ student_id: z.string().uuid() }).array().optional(),
  })
  .refine((field) => (field.class_id = field.class.id))
  .refine((field) => (field.school_id = field.class.school.id))
  .refine(
    (field) =>
      (field.students = field.class.students.map(({ id }) => {
        return { student_id: id }
      })),
  )

export const frequencyUpdateSchema = z
  .object({
    justification: z
      .string({ required_error: 'Justificativa obrigatória' })
      .nonempty('Justificativa obrigatória'),
    status: z.enum(['PRESENTED', 'MISSED', 'JUSTIFIED']).optional(),
    updated_at: z.string().optional(),
  })
  .refine((field) => (field.status = 'JUSTIFIED'))
  .refine((field) => (field.updated_at = dayjs().format()))

export const reportSchema = z.object({
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
