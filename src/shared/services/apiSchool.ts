import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iSchool, iSchoolClass } from "../interfaces";

const create = async (data: FieldValues): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>("schools", data);
  return response;
};

const impSchool = async (data: FormData): Promise<void> => {
  await apiUsingNow.post("imports/school", data);
};

const update = async (data: FieldValues, id: string): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.patch<iSchool>(
    `schools/${id}`,
    data
  );
  return response;
};

const updateInfreq = async (data: FieldValues): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.patch<iSchool>(
    `infrequency/school`,
    data
  );
  return response;
};

const deleteServer = async (school_id: string, server_id: string) => {
  await apiUsingNow.delete(`schools/${school_id}/server/${server_id}`);
};

interface iList {
  schools: iSchool[];
  total: number;
  result: iSchool[];
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(`schools${query}`);

  return response;
};

interface iListClass {
  schools: iSchoolClass[];
  total: number;
  result: iSchoolClass[];
}

const listClass = async (
  year_id: string,
  query: string
): Promise<iListClass> => {
  const { data: response } = await apiUsingNow.get<iListClass>(
    `schools/list/${year_id}${query}`
  );

  return response;
};

const retrieve = async (id: string, year_id: string): Promise<iSchoolClass> => {
  const { data: response } = await apiUsingNow.get<iSchoolClass>(
    `schools/${id}/year/${year_id}`
  );

  return response;
};

export const apiSchool = {
  create,
  impSchool,
  update,
  updateInfreq,
  deleteServer,
  list,
  listClass,
  retrieve,
};
