import { z } from "zod";
import {
  createAdmSchema,
  createDirectorSchema,
  createSecretSchema,
  userFirstSchema,
  userPasswordSchema,
  userUpdateSchema,
} from "../schemas";
import { iSchool, iWorkSchool } from "./school.interface";

export type iRole = "ADMIN" | "SERV" | "DIRET" | "SECRET";

export type iDash = "COMMON" | "SCHOOL" | "ORGAN" | "ADMIN";

export interface iUser {
  id: string;
  login: string;
  name: string;
  cpf: string;
  email: string;
  role: iRole;
  dash: iDash;
  is_active: boolean;
  is_first_access: boolean;
  created_at: Date;
  director_school: iSchool;
  work_school: iWorkSchool[];
}

export type iUserAdmRequest = z.infer<typeof createAdmSchema>;

export type iUserDirectorRequest = z.infer<typeof createDirectorSchema>;

export type iUserSecretRequest = z.infer<typeof createSecretSchema>;

export type iUserFirstRequest = z.infer<typeof userFirstSchema>;

export type iUserUpdateRequest = z.infer<typeof userUpdateSchema>;

export type iUserPasswordRequest = z.infer<typeof userPasswordSchema>;
