import { z } from "zod";

export const classCreateSchema = z.object({
  name: z
    .string({ required_error: "Nome obrigatório" })
    .nonempty("Nome obrigatório"),
});

export const classSchoolCreateSchema = z
  .object({
    class: z.object(
      { id: z.string().uuid() },
      { required_error: "Turma obrigatória" }
    ),
    class_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.class_id = field.class.id));
