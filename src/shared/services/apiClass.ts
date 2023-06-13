import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iClass, iClassSchoolRequest } from "../interfaces";

export async function postClass(data: FieldValues): Promise<iClass> {
  const { data: response } = await apiUsingNow.post<iClass>("classes", data);
  return response;
}

export async function postClassSchool(
  data: iClassSchoolRequest,
  year_id: string,
  school_id: string
): Promise<iClass> {
  const { data: response } = await apiUsingNow.post<iClass>(
    `classes/${year_id}/${school_id}`,
    data
  );
  return response;
}

export async function postImportClass(data: FormData): Promise<void> {
  await apiUsingNow.post("imports/class", data);
}

export async function patchClassSchool(data: FieldValues): Promise<iClass> {
  const { data: response } = await apiUsingNow.patch<iClass>("classes", data);
  return response;
}
