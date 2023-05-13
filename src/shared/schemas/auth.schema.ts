import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string({ required_error: "Usuário obrigatório" })
    .nonempty("Usuário obrigatório"),
  password: z
    .string({ required_error: "Senha obrigatória" })
    .nonempty("Senha obrigatória"),
});

export const recoverySchema = z.object({
  login: z
    .string({ required_error: "Usuário obrigatório" })
    .nonempty("Usuário obrigatório"),
});
