import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import {
  iFrequency,
  iFrequencyWithInfreq,
  iSchool,
  iStudent,
} from "../interfaces";

export async function postSchool(data: FieldValues): Promise<iSchool> {
  const { data: response } = await apiUsingNow.post<iSchool>("schools", data);
  return response;
}

export async function postImportSchool(data: FormData): Promise<void> {
  await apiUsingNow.post("imports/school", data);
}

export async function postStudent(
  data: FieldValues,
  id: string
): Promise<iStudent> {
  const { data: response } = await apiUsingNow.post<iStudent>(
    `students/${id}`,
    data
  );
  return response;
}

export async function patchStudent(
  data: FieldValues,
  id: string
): Promise<iStudent> {
  const { data: response } = await apiUsingNow.patch<iStudent>(
    `students/${id}`,
    data
  );
  return response;
}

export async function patchManyStudent(data: FieldValues): Promise<iStudent> {
  const { data: response } = await apiUsingNow.patch<iStudent>(
    "students",
    data
  );
  return response;
}

export async function postImportStudent(
  data: FormData,
  class_id: string,
  school_id: string
): Promise<void> {
  await apiUsingNow.post(`imports/student/${class_id}/${school_id}`, data);
}

export async function postImportStudentAll(data: FormData): Promise<void> {
  await apiUsingNow.post("imports/student", data);
}

export async function postFrequency(data: FieldValues): Promise<iFrequency> {
  const { data: response } = await apiUsingNow.post<iFrequency>(
    "frequencies",
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
): Promise<iFrequencyWithInfreq> {
  const { data: response } = await apiUsingNow.patch<iFrequencyWithInfreq>(
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

export async function deleteFrequency(id: string) {
  await apiUsingNow.delete(`frequencies/${id}`);
}

export async function deleteSchoolServer(school_id: string, server_id: string) {
  await apiUsingNow.delete(`schools/${school_id}/server/${server_id}`);
}
