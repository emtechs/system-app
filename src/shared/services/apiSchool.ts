import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import {
  iSchool,
  iSchoolClass,
  iSchoolServer,
  iSelectBase,
  iYear,
} from "../interfaces";

const create = async (data: FieldValues): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>("schools", data);
  return response;
};

const createServer = async (
  data: FieldValues,
  server_id: string
): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>(
    "schools/" + server_id,
    data
  );
  return response;
};

const createClass = async (
  data: FieldValues,
  school_id: string,
  year_id: string
): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>(
    `schools/${school_id}/${year_id}`,
    data
  );
  return response;
};

const impSchool = async (data: FormData): Promise<void> => {
  await apiUsingNow.post("imports/school", data);
};

const update = async (
  data: FieldValues,
  id: string,
  query?: string
): Promise<iSchool> => {
  query = query ? query : "";
  const { data: response } = await apiUsingNow.patch<iSchool>(
    `schools/${id}${query}`,
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
  schools: iSchool[];
  total: number;
  result: iSchoolClass[];
}

const listClass = async (query: string): Promise<iListClass> => {
  const { data: response } = await apiUsingNow.get<iListClass>(
    `schools${query}`
  );

  return response;
};

interface ilistServers {
  total: number;
  result: iSchoolServer[];
}

const listServers = async (
  id: string,
  query: string
): Promise<ilistServers> => {
  const { data: response } = await apiUsingNow.get<ilistServers>(
    `schools/${id}/server${query}`
  );

  return response;
};

interface iRetrieveReturn {
  school: iSchool;
  years: iYear[];
  periods: iSelectBase[];
  schoolClass: iSchoolClass;
}

const retrieve = async (
  id: string,
  query: string
): Promise<iRetrieveReturn> => {
  const { data: response } = await apiUsingNow.get<iRetrieveReturn>(
    `schools/${id}${query}`
  );

  return response;
};

export const apiSchool = {
  create,
  createClass,
  createServer,
  impSchool,
  update,
  updateInfreq,
  deleteServer,
  list,
  listClass,
  listServers,
  retrieve,
};
