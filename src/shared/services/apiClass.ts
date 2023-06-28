import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import {
  iClass,
  iClassDash,
  iClassSchoolList,
  iClassSchoolRequest,
  iClassWithSchool,
  iClassWithSchoolSelect,
} from "../interfaces";

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

interface ilistSchoolReturn {
  total: number;
  result: iClassSchoolList[];
}

const listSchool = async (
  year_id: string,
  query: string
): Promise<ilistSchoolReturn> => {
  const { data: response } = await apiUsingNow.get<ilistSchoolReturn>(
    `classes/year/${year_id}${query}`
  );

  return response;
};

interface iListWithSchool {
  classes: iClassWithSchoolSelect[];
  total: number;
  result: iClassWithSchool[];
}

const listWithSchool = async (school_id: string, query: string) => {
  const { data: response } = await apiUsingNow.get<iListWithSchool>(
    `classes/school/${school_id}${query}`
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

export const apiClass = {
  create,
  createSchool,
  impClass,
  updateSchool,
  listSchool,
  listWithSchool,
  listDash,
};
