import { z } from "zod";

export const schoolCreateSchema = z
  .object({
    name: z
      .string({ required_error: "Nome obrigatório" })
      .nonempty("Nome obrigatório"),
    director: z.object(
      { id: z.string().uuid() },
      { required_error: "Diretor obrigatório" }
    ),
    director_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.director_id = field.director.id));

export const serverCreateSchema = z
  .object({
    name: z
      .string({ required_error: "Nome obrigatório" })
      .nonempty("Nome obrigatório"),
    login: z.string(),
    cpf: z
      .string({ required_error: "CPF obrigatório" })
      .min(14, "Precisa ter 14 digitos"),
    password: z.string().optional(),
    dash: z.enum(["COMMON", "SCHOOL", "ORGAN", "ADMIN"]),
  })
  .refine((fields) => (fields.password = fields.login.substring(0, 6)));

export const classCreateSchema = z.object({
  name: z
    .string({ required_error: "Nome obrigatório" })
    .nonempty("Nome obrigatório"),
});

export const studentCreateSchema = z
  .object({
    name: z
      .string({ required_error: "Nome obrigatório" })
      .nonempty("Nome obrigatório"),
    registry: z
      .string({ required_error: "Matricula obrigatória" })
      .nonempty("Matricula obrigatória"),
    class: z.object(
      { id: z.string().uuid() },
      { required_error: "Turma obrigatória" }
    ),
    class_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.class_id = field.class.id));
