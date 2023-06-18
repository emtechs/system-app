import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import { iSchoolSelect, iUser, iWorkSchool } from "../interfaces";

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

const profile = async (token: string): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>("users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

const update = async (id: string, data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.patch<iUser>(
    `users/${id}`,
    data
  );
  return response;
};

interface iSchool {
  schools: iSchoolSelect[];
  total: number;
  result: iWorkSchool[];
}

const schools = async (query: string) => {
  const { data: response } = await apiUsingNow.get<iSchool>(
    `users/schools${query}`
  );
  return response;
};

export const apiUser = { create, profile, update, schools };
