import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import {
  iSchool,
  iSchoolServer,
  iSelectBase,
  iUser,
  iWorkSchool,
  iWorkSchoolClass,
} from "../interfaces";

const create = async (
  data: FieldValues,
  queryData?: string
): Promise<iUser> => {
  const query = queryData ? queryData : "";
  const { data: response } = await apiUsingNow.post<iUser>(
    "users" + query,
    data
  );
  return response;
};

const createServer = async (
  data: FieldValues,
  school_id: string
): Promise<iSchoolServer> => {
  const { data: response } = await apiUsingNow.post<iSchoolServer>(
    `users?school_id=${school_id}`,
    data
  );
  return response;
};

const retrieve = async (id: string): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>(`users/${id}`);
  return response;
};

const profile = async (token: string): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>("users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

interface iListReturn {
  total: number;
  result: iUser[];
  roles: iSelectBase[];
}

const list = async (query: string): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>(
    `users${query}`
  );
  return response;
};

const update = async (id: string, data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.patch<iUser>(
    `users/${id}`,
    data
  );
  return response;
};

interface iSchoolReturn {
  schools: iSchool[];
  total: number;
  result: iWorkSchool[];
}

const schools = async (query: string) => {
  const { data: response } = await apiUsingNow.get<iSchoolReturn>(
    `users/schools${query}`
  );
  return response;
};

interface iSchoolClassReturn {
  schools: iSchool[];
  total: number;
  result: iWorkSchoolClass[];
}

const schoolsClass = async (query: string) => {
  const { data: response } = await apiUsingNow.get<iSchoolClassReturn>(
    `users/schools${query}`
  );
  return response;
};

interface iSchoolsServer {
  total: number;
  result: iWorkSchool[];
  user: iUser;
}

const schoolsServer = async (id: string, query: string) => {
  const { data: response } = await apiUsingNow.get<iSchoolsServer>(
    `users/${id}/server${query}`
  );
  return response;
};

export const apiUser = {
  create,
  createServer,
  profile,
  update,
  schools,
  retrieve,
  schoolsServer,
  schoolsClass,
  list,
};
