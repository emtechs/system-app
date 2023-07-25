import { z } from 'zod'
import { loginSchema, passwordRecoverySchema, recoverySchema } from '../schemas'

export type iLoginRequest = z.infer<typeof loginSchema>

export interface iLoginResponse {
  token: string
}

export type iRecoveryRequest = z.infer<typeof recoverySchema>

export type iRecoveryPasswordRequest = z.infer<typeof passwordRecoverySchema>
