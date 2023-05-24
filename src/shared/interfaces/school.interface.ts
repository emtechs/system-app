import { z } from "zod";
import {
  classCreateSchema,
  frequencyCreateSchema,
  schoolCreateSchema,
  schoolImportSchema,
  serverCreateSchema,
  studentCreateSchema,
  studentImportSchema,
} from "../schemas";
import { iDash } from ".";

export interface iDirector {
  id: string;
  name: string;
  cpf: string;
}

export interface iSchool {
  id: string;
  name: string;
  is_active: boolean;
  director?: iDirector;
}

export interface iSchoolSelect extends iSchool {
  label: string;
}

export interface iWorkSchool {
  id: string;
  dash: iDash;
  school: iSchool;
}

export interface iStudent {
  id: string;
  name: string;
  registry: string;
  is_active: boolean;
  justify_disabled?: string;
  presented: number;
  justified: number;
  missed: number;
  total_frequencies: number;
  infrequency: number;
}

export interface iClass {
  id: string;
  name: string;
  students: iStudent[];
  school: iSchool;
  _count: { frequencies: number; students: number };
  infrequency: number;
}

export interface iClassSelect extends iClass {
  label: string;
}

export type iStatusFrequency = "OPENED" | "CLOSED";

export type iStatusStudent = "PRESENTED" | "MISSED" | "JUSTIFIED";

export interface iFrequency {
  id: string;
  date: string;
  status: iStatusFrequency;
  class: iClass;
  students: iFrequencyStudents[];
}

export interface iFrequencyStudents {
  id: string;
  status: iStatusStudent;
  justification?: string;
  updated_at?: string;
  student: iStudent;
}

export type iServerRequest = z.infer<typeof serverCreateSchema>;

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iSchoolImportRequest = z.infer<typeof schoolImportSchema>;

export type iClassRequest = z.infer<typeof classCreateSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;

export type iFrequencyRequest = z.infer<typeof frequencyCreateSchema>;
