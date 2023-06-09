import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iClass, iClassDash, iClassSchoolRequest, iYear } from "../interfaces";

const create = async (data: FieldValues): Promise<iClass> => {
  const { data: response } = await apiUsingNow.post<iClass>("classes", data);
  return response;
};

const createSchool = async (
  data: iClassSchoolRequest,
  year_id: string,
  school_id: string
): Promise<iClass> => {
  const { data: response } = await apiUsingNow.post<iClass>(
    `classes/${year_id}/${school_id}`,
    data
  );
  return response;
};

const impClass = async (data: FormData): Promise<void> => {
  await apiUsingNow.post("imports/class", data);
};

const updateSchool = async (data: FieldValues): Promise<iClass> => {
  const { data: response } = await apiUsingNow.patch<iClass>("classes", data);
  return response;
};

interface ilistReturn {
  classes: iClass[];
  total: number;
  result: iClass[];
  years: iYear[];
}

const list = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(
    `classes${query}`
  );

  return response;
};

interface iClassYearReturn {
  classes: iClass[];
  total: number;
  result: iClass[];
}

const listClass = async (
  id: string,
  query: string
): Promise<iClassYearReturn> => {
  const { data: response } = await apiUsingNow.get<iClassYearReturn>(
    `classes/year/${id}${query}`
  );

  return response;
};

interface ilistDash {
  classes: iClassDash[];
  total: number;
  result: iClassDash[];
}

const listDash = async (school_id: string, year_id: string, query: string) => {
  const { data: response } = await apiUsingNow.get<ilistDash>(
    `classes/school/${school_id}/dash/${year_id}${query}`
  );

  return response;
};

const retrieve = async (id: string) => {
  const { data: response } = await apiUsingNow.get<iClass>(`classes/${id}`);

  return response;
};

export const apiClass = {
  create,
  createSchool,
  impClass,
  updateSchool,
  listClass,
  listDash,
  list,
  retrieve,
};
