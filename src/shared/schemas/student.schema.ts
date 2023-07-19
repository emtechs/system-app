import { z } from "zod";

export const studentRemoveSchema = z
  .object({
    justify_disabled: z
      .string({ required_error: "Justificativa obrigatório" })
      .nonempty("Justificativa obrigatório"),
    finished_at: z.number().optional(),
  })
  .refine((fields) => (fields.finished_at = Date.now()));

export const studentTransferSchema = z
  .object({
    justify_disabled: z
      .string({ required_error: "Justificativa obrigatório" })
      .nonempty("Justificativa obrigatório"),
    finished_at: z.number().optional(),
    class: z.object(
      { id: z.string().uuid() },
      { required_error: "Turma obrigatória" }
    ),
    school: z.object(
      { id: z.string().uuid() },
      { required_error: "Escola obrigatório" }
    ),
    class_id: z.string().uuid().optional(),
    school_id: z.string().uuid().optional(),
    year_id: z.string().uuid(),
    student_id: z.string().uuid(),
    key: z.string().uuid(),
  })
  .refine((fields) => (fields.finished_at = Date.now()))
  .refine((fields) => (fields.class_id = fields.class.id))
  .refine((fields) => (fields.school_id = fields.school.id));
