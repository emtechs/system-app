import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iUser } from "../interfaces";

export async function postUser(data: FieldValues): Promise<iUser> {
  const { data: response } = await apiUsingNow.post<iUser>("users", data);
  return response;
}

export async function patchUser(
  id: string,
  data: FormData | FieldValues
): Promise<iUser> {
  const { data: response } = await apiUsingNow.patch<iUser>(
    `users/${id}`,
    data
  );
  return response;
}
