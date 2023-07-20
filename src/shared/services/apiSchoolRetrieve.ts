import { apiUsingNow } from "./api";
import { iSchoolClass, iSchoolStudent, iSchoolUser } from "../interfaces";

interface iClassDataReturn {
  total: number;
  result: iSchoolClass[];
}

const classData = async (
  id: string,
  queryData: string
): Promise<iClassDataReturn> => {
  const query = `?view=class${queryData}`;
  const { data: response } = await apiUsingNow.get<iClassDataReturn>(
    `schools/${id}${query}`
  );

  return response;
};

interface iServerReturn {
  total: number;
  result: iSchoolUser[];
}

const server = async (
  id: string,
  queryData: string
): Promise<iServerReturn> => {
  const query = `?view=server${queryData}`;
  const { data: response } = await apiUsingNow.get<iServerReturn>(
    `schools/${id}${query}`
  );

  return response;
};

interface iStudentReturn {
  total: number;
  result: iSchoolStudent[];
}

const student = async (
  id: string,
  queryData: string
): Promise<iStudentReturn> => {
  const query = `?view=student${queryData}`;
  const { data: response } = await apiUsingNow.get<iStudentReturn>(
    `schools/${id}${query}`
  );

  return response;
};

export const apiSchoolRetrieve = { classData, server, student };
