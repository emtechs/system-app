import { z } from "zod";

export const userCreateSchema = z
  .object({
    name: z
      .string({ required_error: "Nome obrigatório" })
      .nonempty("Nome obrigatório"),
    login: z.string(),
    cpf: z
      .string({ required_error: "CPF obrigatório" })
      .min(14, "Precisa ter 14 digitos"),
    password: z.string().optional(),
    role: z.enum(["SERV", "DIRET", "SECRET", "ADMIN"]),
  })
  .refine((fields) => (fields.password = fields.login.substring(0, 6)));

export const userFirstSchema = z
  .object({
    name: z
      .string({ required_error: "Nome completo obrigatório" })
      .nonempty("Nome completo obrigatório"),
    email: z
      .string({ required_error: "Email obrigatório" })
      .email("Email inválido"),
    password: z
      .string({ required_error: "Senha obrigatória" })
      .nonempty("Senha obrigatória"),
    repeat_password: z
      .string({ required_error: "Confirmar senha obrigatória" })
      .nonempty("Confirmar senha obrigatória"),
    is_first_access: z.boolean().default(true),
  })
  .refine((fields) => fields.password === fields.repeat_password, {
    path: ["repeat_password"],
    message: "As senhas precisam ser iguais",
  });

export const userUpdateSchema = z.object({
  name: z
    .string({ required_error: "Nome completo obrigatório" })
    .nonempty("Nome completo obrigatório"),
  email: z
    .string({ required_error: "Email obrigatório" })
    .email("Email inválido"),
});

export const userPasswordSchema = z
  .object({
    old_password: z
      .string({ required_error: "Senha Atual obrigatória" })
      .nonempty("Senha Atual obrigatória"),
    password: z
      .string({ required_error: "Senha obrigatória" })
      .nonempty("Senha obrigatória"),
    repeat_password: z
      .string({ required_error: "Confirmar senha obrigatória" })
      .nonempty("Confirmar senha obrigatória"),
  })
  .refine((fields) => fields.password === fields.repeat_password, {
    path: ["repeat_password"],
    message: "As senhas precisam ser iguais",
  });
