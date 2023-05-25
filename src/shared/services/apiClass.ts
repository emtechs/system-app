import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iClass } from "../interfaces";

export async function postClass(data: FieldValues): Promise<iClass> {
  const { data: response } = await apiUsingNow.post<iClass>("classes", data);
  return response;
}

export async function postImportClass(data: FormData): Promise<void> {
  await apiUsingNow.post("imports/class", data);
}
