import { FieldValues } from "react-hook-form";
import { iFrequency, iFrequencyWithInfreq } from "../interfaces";
import { apiUsingNow } from "./api";

const create = async (data: FieldValues): Promise<iFrequency> => {
  const { data: response } = await apiUsingNow.post<iFrequency>(
    "frequencies",
    data
  );
  return response;
};

const update = async (
  data: FieldValues,
  id: string
): Promise<iFrequencyWithInfreq> => {
  const { data: response } = await apiUsingNow.patch<iFrequencyWithInfreq>(
    `frequencies/${id}`,
    data
  );
  return response;
};

const updateInfreq = async (data: FieldValues, id: string): Promise<void> => {
  await apiUsingNow.patch(`frequencies/infreq/${id}`, data);
};

const updateFreqStudent = async (
  data: FieldValues,
  id: string
): Promise<iFrequency> => {
  const { data: response } = await apiUsingNow.patch<iFrequency>(
    `frequencies/student/${id}`,
    data
  );
  return response;
};

const destroy = async (id: string) => {
  await apiUsingNow.delete(`frequencies/${id}`);
};

export const apiFrequency = {
  create,
  update,
  updateInfreq,
  updateFreqStudent,
  destroy,
};
