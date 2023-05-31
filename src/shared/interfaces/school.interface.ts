import { z } from "zod";
import {
  frequencyCreateSchema,
  schoolCreateSchema,
  schoolImportSchema,
  serverCreateSchema,
  studentCreateSchema,
  studentImportSchema,
} from "../schemas";
import { iDash, iStudent, iStudentDash } from ".";
import { iClassFreq, iClassWithSchoolDash } from "./class.interfaces";

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

export interface iSchoolDash extends iSchool {
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

export type iStatusFrequency = "OPENED" | "CLOSED";

export type iStatusStudent = "PRESENTED" | "MISSED" | "JUSTIFIED";

interface iUserFreq {
  id: string;
  name: string;
  cpf: string;
}

export interface iFrequency {
  id: string;
  date: string;
  month: number;
  status: iStatusFrequency;
  finished_at: number;
  class: iClassFreq;
  user: iUserFreq;
  students: iFrequencyStudents[];
  infrequency?: number;
  class_infreq?: number;
  school_infreq?: number;
  _count: { students: number };
}

export interface iFrequencyWithInfreq {
  id: string;
  date: string;
  month: number;
  status: iStatusFrequency;
  created_at: Date;
  finished_at: number;
  class: iClassFreq;
  user: iUserFreq;
  students: iFrequencyStudentsWithInfreq[];
  infrequency: number;
  class_infreq?: number;
  school_infreq?: number;
  _count: { students: number };
}

export interface iFrequencyStudents {
  id: string;
  status: iStatusStudent;
  justification?: string;
  updated_at?: string;
  student: iStudent;
  _count: { students: number };
}

export interface iFrequencyStudentsWithInfreq {
  id: string;
  status: iStatusStudent;
  justification?: string;
  updated_at?: string;
  name: string;
  registry: string;
  infreq: number;
  infrequency: number;
  frequencyStudent_id: string;
}

export type iServerRequest = z.infer<typeof serverCreateSchema>;

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iSchoolImportRequest = z.infer<typeof schoolImportSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;

export type iFrequencyRequest = z.infer<typeof frequencyCreateSchema>;
