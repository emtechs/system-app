import { apiUsingNow } from './api'
import {
  iLoginRequest,
  iLoginResponse,
  iRecoveryPasswordRequest,
  iRecoveryRequest,
  iSelectBase,
  iYear,
} from '../interfaces'

const login = async (data: iLoginRequest): Promise<iLoginResponse> => {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    'login',
    data,
  )
  return response
}

const recovery = async (data: iRecoveryRequest): Promise<void> => {
  await apiUsingNow.post('password', data)
}

const passwordRecovery = async (
  data: iRecoveryPasswordRequest,
  userId: string,
  token: string,
): Promise<void> => {
  await apiUsingNow.post(`password/${userId}/${token}`, data)
}

interface iVerify {
  select: iSelectBase
  years?: iYear[]
  school?: iSelectBase
  year?: iSelectBase
}

const verify = async (query: string): Promise<iVerify> => {
  const { data: response } = await apiUsingNow.get<iVerify>(`verify${query}`)
  return response
}

export const apiAuth = { login, recovery, passwordRecovery, verify }
