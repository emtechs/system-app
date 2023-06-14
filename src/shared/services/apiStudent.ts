import { FieldValues } from "react-hook-form";
import { iStudent } from "../interfaces";
import { apiUsingNow } from "./api";

const create = async (data: FieldValues, id: string): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.post<iStudent>(
    `students/${id}`,
    data
  );
  return response;
};

const update = async (data: FieldValues, id: string): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.patch<iStudent>(
    `students/${id}`,
    data
  );
  return response;
};

const updateMany = async (data: FieldValues): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.patch<iStudent>(
    "students",
    data
  );
  return response;
};

const impStudent = async (
  data: FormData,
  class_id: string,
  school_id: string
): Promise<void> => {
  await apiUsingNow.post(`imports/student/${class_id}/${school_id}`, data);
};

const impStudentAll = async (data: FormData): Promise<void> => {
  await apiUsingNow.post("imports/student", data);
};

export const apiStudent = {
  create,
  update,
  updateMany,
  impStudent,
  impStudentAll,
};
