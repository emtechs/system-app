import { apiUsingNow } from "./api";
import {
  iLoginRequest,
  iLoginResponse,
  iRecoveryPasswordRequest,
  iRecoveryRequest,
} from "../interfaces";

const login = async (data: iLoginRequest): Promise<iLoginResponse> => {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    "login",
    data
  );
  return response;
};

const recovery = async (data: iRecoveryRequest): Promise<void> => {
  await apiUsingNow.post("password", data);
};

const passwordRecovery = async (
  data: iRecoveryPasswordRequest,
  userId: string,
  token: string
): Promise<void> => {
  await apiUsingNow.post(`password/${userId}/${token}`, data);
};

export const apiAuth = { login, recovery, passwordRecovery };
