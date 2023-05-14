import { z } from "zod";
import {
  userCreateSchema,
  userFirstSchema,
  userPasswordSchema,
  userUpdateSchema,
} from "../schemas";

export interface iUser {
  id: string;
  login: string;
  name: string;
  cpf: string;
  email: string;
  role: "SERV" | "DIRET" | "SECRET" | "ADMIN";
  is_active: boolean;
  is_first_access: boolean;
  created_at: Date;
}

export type iUserRequest = z.infer<typeof userCreateSchema>;

export type iUserFirstRequest = z.infer<typeof userFirstSchema>;

export type iUserUpdateRequest = z.infer<typeof userUpdateSchema>;

export type iUserPasswordRequest = z.infer<typeof userPasswordSchema>;
