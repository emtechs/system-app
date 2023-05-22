import { z } from "zod";
import {
  classCreateSchema,
  frequencyCreateSchema,
  schoolCreateSchema,
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
  director: iDirector;
  frequencies: iFrequency[];
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
}

export interface iClass {
  id: string;
  name: string;
  students: iStudent[];
  _count: { students: number };
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

export type iClassRequest = z.infer<typeof classCreateSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;

export type iFrequencyRequest = z.infer<typeof frequencyCreateSchema>;
