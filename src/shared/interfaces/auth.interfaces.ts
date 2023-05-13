import { z } from "zod";
import { loginSchema, recoverySchema } from "../schemas";

export type iLoginRequest = z.infer<typeof loginSchema>;

export interface iLoginResponse {
  access: string;
}

export type iRecoveryRequest = z.infer<typeof recoverySchema>;
