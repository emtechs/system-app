import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iClass, iFrequency, iSchool } from "../interfaces";

export async function postSchool(data: FieldValues): Promise<iSchool> {
  const { data: response } = await apiUsingNow.post<iSchool>("schools", data);
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

export async function postImportStudent(
  data: FormData,
  class_id: string,
  school_id: string
): Promise<void> {
  await apiUsingNow.post(`students/import/${class_id}/${school_id}`, data);
}

export async function postFrequency(data: FieldValues): Promise<iFrequency> {
  const { data: response } = await apiUsingNow.post<iFrequency>(
    'frequencies',
    data
  );
  return response;
}

export async function patchSchool(
  data: FieldValues,
  id: string
): Promise<iSchool> {
  const { data: response } = await apiUsingNow.patch<iSchool>(
    `schools/${id}`,
    data
  );
  return response;
}

export async function patchFrequency(
  data: FieldValues,
  id: string
): Promise<iFrequency> {
  const { data: response } = await apiUsingNow.patch<iFrequency>(
    `frequencies/${id}`,
    data
  );
  return response;
}

export async function patchFrequencyStudent(
  data: FieldValues,
  id: string
): Promise<iFrequency> {
  const { data: response } = await apiUsingNow.patch<iFrequency>(
    `frequencies/student/${id}`,
    data
  );
  return response;
}
