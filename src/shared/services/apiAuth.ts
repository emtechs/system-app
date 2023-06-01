import { apiUsingNow } from "./api";
import {
  iLoginRequest,
  iLoginResponse,
  iRecoveryPasswordRequest,
  iRecoveryRequest,
} from "../interfaces";

export async function postLogin(data: iLoginRequest): Promise<iLoginResponse> {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    "login",
    data
  );
  return response;
}

export async function postRecovery(data: iRecoveryRequest): Promise<void> {
  await apiUsingNow.post("password", data);
}

export async function postPasswordRecovery(
  data: iRecoveryPasswordRequest,
  userId: string,
  token: string
): Promise<void> {
  await apiUsingNow.post(`password/${userId}/${token}`, data);
}
