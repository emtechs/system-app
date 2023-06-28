import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iSchool, iSchoolList, iSchoolSelect } from "../interfaces";

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
  schools: iSchoolSelect[];
  total: number;
  result: iSchoolList[];
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(`schools${query}`);

  return response;
};

export const apiSchool = {
  create,
  impSchool,
  update,
  updateInfreq,
  deleteServer,
  list,
};
