import { z } from "zod";
import {
  schoolCreateSchema,
  schoolImportSchema,
  serverCreateSchema,
  studentCreateSchema,
  studentImportSchema,
} from "../schemas";
import { iClassWithSchoolDash } from "./class.interfaces";
import { iDash, iRole } from "./user.interfaces";
import { iStudentDash } from "./student.interface";

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
  school_infreq: number;
}

export interface iSchoolList extends iSchool {
  servers: { role: iRole; server: iDirector }[];
  num_students: number;
  num_frequencies: number;
  num_classes: number;
}

export interface iSchoolDash extends iSchool {
  infrequency: number;
  total_students: number;
  classes: iClassWithSchoolDash[];
}

export interface iSchoolWithStudents extends iSchoolDash {
  students: iStudentDash[];
}

export interface iSchoolSelect extends iSchool {
  label: string;
}

export interface iWorkSchool {
  dash: iDash;
  school: iSchool;
}

export interface iWithSchool {
  id: string;
  name: string;
}

export interface iSchoolYear {
  id: string;
  year: string;
}

export type iServerRequest = z.infer<typeof serverCreateSchema>;

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iSchoolImportRequest = z.infer<typeof schoolImportSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;
