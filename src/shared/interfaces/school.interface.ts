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
  school_infreq: number;
}

interface iClassWithSchoolDash {
  class: iClass;
  class_infreq: number;
  _count: { students: number };
}

export interface iSchoolDash {
  id: string;
  name: string;
  is_active: boolean;
  director?: iDirector;
  school_infreq: number;
  total_students: number;
  classes: iClassWithSchoolDash[];
}

export interface iSchoolSelect extends iSchool {
  label: string;
}

export interface iWorkSchool {
  dash: iDash;
  school: iSchool;
}

export interface iStudent {
  id: string;
  name: string;
  registry: string;
  is_active: boolean;
  justify_disabled?: string;
  infreq: number;
  presented: number;
  justified: number;
  missed: number;
  total_frequencies: number;
  infrequency: number;
}

export interface iStudentWithSchool {
  id: string;
  name: string;
  registry: string;
  presented: number;
  justified: number;
  missed: number;
  total_frequencies: number;
  infrequency: number;
}

export interface iClass {
  id: string;
  name: string;
}

export interface iClassDash {
  class: iClass;
  class_infreq: number;
  school: iWithSchool;
  school_year: iSchoolYear;
  students: {
    student: { id: string; name: string; registry: string };
  }[];
  _count: { frequencies: number; students: number };
}

export interface iWithSchool {
  id: string;
  name: string;
}

export interface iSchoolYear {
  id: string;
  year: string;
}

export interface iClassWithSchool {
  class: iClass;
  class_infreq: number;
  school: iWithSchool;
  school_year: iSchoolYear;
  students: iStudentWithSchool[];
  _count: { frequencies: number; students: number };
  infrequency: number;
}

export interface iClassSelect extends iClass {
  label: string;
}

export type iStatusFrequency = "OPENED" | "CLOSED";

export type iStatusStudent = "PRESENTED" | "MISSED" | "JUSTIFIED";

interface iUserFreq {
  id: string;
  name: string;
  cpf: string;
}

interface iClassFreq {
  class: iClass;
  school: iWithSchool;
  school_year: iSchoolYear;
  class_infreq: number;
}

export interface iFrequency {
  id: string;
  date: string;
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
  status: iStatusFrequency;
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
  student: {
    id: string;
    name: string;
    registry: string;
  };
  _count: { students: number };
}

export interface iFrequencyStudentsWithInfreq {
  id: string;
  status: iStatusStudent;
  justification?: string;
  updated_at?: string;
  name: string;
  registry: string;
  infrequency: number;
  frequencyStudent_id: string;
}

export type iServerRequest = z.infer<typeof serverCreateSchema>;

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iSchoolImportRequest = z.infer<typeof schoolImportSchema>;

export type iClassRequest = z.infer<typeof classCreateSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;

export type iFrequencyRequest = z.infer<typeof frequencyCreateSchema>;
