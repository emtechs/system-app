import { apiUsingNow } from "./api";
import { iLoginRequest, iLoginResponse, iRecoveryRequest } from "../interfaces";

export async function postLogin(data: iLoginRequest): Promise<iLoginResponse> {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    "login",
    data
  );
  return response;
}

export async function postRecovery(
  data: iRecoveryRequest
): Promise<iLoginResponse> {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    "login",
    data
  );
  return response;
}
