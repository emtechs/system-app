import dayjs from "dayjs";
import { z } from "zod";
import { csvSchema } from "./file.schema";

export const schoolCreateSchema = z.object({
  name: z
    .string({ required_error: "Nome da Escola obrigatório" })
    .nonempty("Nome da Escola obrigatório"),
});

export const schoolImportSchema = z.object({
  file: csvSchema,
});

export const schoolUpdateSchema = z.object({
  name: z
    .string({ required_error: "Nome da Escola obrigatório" })
    .nonempty("Nome da Escola obrigatório"),
});

export const schoolUpdateDirectorSchema = z
  .object({
    login: z.string(),
    cpf: z
      .string({ required_error: "CPF obrigatório" })
      .min(14, "Precisa ter 14 digitos"),
    name_diret: z
      .string({ required_error: "Nome obrigatório" })
      .nonempty("Nome obrigatório"),
    password: z.string().optional(),
    role: z.enum(["SERV", "DIRET", "SECRET", "ADMIN"]).default("DIRET"),
    dash: z.enum(["COMMON", "SCHOOL", "ORGAN", "ADMIN"]).default("SCHOOL"),
  })
  .refine((fields) => (fields.password = fields.login.substring(0, 6)));

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

export const studentImportSchema = z
  .object({
    file: csvSchema,
    class: z.object(
      { id: z.string().uuid() },
      { required_error: "Turma obrigatória" }
    ),
    class_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.class_id = field.class.id));

export const frequencyCreateSchema = z
  .object({
    date: z
      .string({ required_error: "Data obrigatório" })
      .nonempty("Data obrigatório"),
    class: z.object(
      {
        id: z.string().uuid(),
        students: z.object({ id: z.string().uuid() }).array(),
      },
      { required_error: "Turma obrigatória" }
    ),
    school: z.object({ id: z.string().uuid() }),
    class_id: z.string().uuid().optional(),
    school_id: z.string().uuid().optional(),
    school_year_id: z.string().uuid(),
    students: z.object({ student_id: z.string().uuid() }).array().optional(),
  })
  .refine((field) => (field.class_id = field.class.id))
  .refine((field) => (field.school_id = field.school.id))
  .refine(
    (field) =>
      (field.students = field.class.students.map(({ id }) => {
        return { student_id: id };
      }))
  );

export const frequencyUpdateSchema = z
  .object({
    justification: z
      .string({ required_error: "Justificativa obrigatória" })
      .nonempty("Justificativa obrigatória"),
    status: z.enum(["PRESENTED", "MISSED", "JUSTIFIED"]).optional(),
    updated_at: z.string().optional(),
  })
  .refine((field) => (field.status = "JUSTIFIED"))
  .refine((field) => (field.updated_at = dayjs().format()));
