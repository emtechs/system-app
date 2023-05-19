import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iUser } from "../interfaces";

export async function postUser(
  data: FieldValues,
  queryData?: string
): Promise<iUser> {
  const query = queryData ? queryData : "";
  const { data: response } = await apiUsingNow.post<iUser>(
    "users" + query,
    data
  );
  return response;
}

export async function patchUser(id: string, data: FieldValues): Promise<iUser> {
  const { data: response } = await apiUsingNow.patch<iUser>(
    `users/${id}`,
    data
  );
  return response;
}
