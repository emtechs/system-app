import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iClass, iSchool, iUser } from "../interfaces";

export async function postSchool(data: FieldValues): Promise<iSchool> {
  const { data: response } = await apiUsingNow.post<iSchool>("schools", data);
  return response;
}

export async function postServer(
  data: FieldValues,
  id: string
): Promise<iUser> {
  const { data: response } = await apiUsingNow.post<iUser>(
    `servers/${id}`,
    data
  );
  return response;
}

export async function postClass(
  data: FieldValues,
  id: string
): Promise<iClass> {
  const { data: response } = await apiUsingNow.post<iClass>(
    `classes/${id}`,
    data
  );
  return response;
}

export async function postStudent(
  data: FieldValues,
  id: string
): Promise<iClass> {
  const { data: response } = await apiUsingNow.post<iClass>(
    `students/${id}`,
    data
  );
  return response;
}
