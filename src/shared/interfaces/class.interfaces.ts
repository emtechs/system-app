import { z } from "zod";
import { classCreateSchema, classSchoolCreateSchema } from "../schemas";
import { iWithSchool } from "./school.interface";
import { iStudent, iStudentClass } from "./student.interface";
import { iYear } from "./calendar.interfaces";

export interface iClass {
  id: string;
  name: string;
}

export interface iDashClass {
  frequencies: number;
  class_infreq: number;
  frequencyOpen: number;
  stundents: number;
}

export interface iClassSchool {
  class: iClass;
  school_id: string;
  year_id: string;
}

export interface iClassStudent {
  class: { class: iClass; school: iClass };
  student: iStudent;
}

export interface iClassWithSchoolSelect extends iClassWithSchool {
  id: string;
  label: string;
}

export interface iClassSelect extends iClass {
  label: string;
}

export interface iClassDash {
  class: iClass;
  infreq: number;
  school: iWithSchool;
  year: iYear;
  students: {
    student: iStudent;
  }[];
  _count: { frequencies: number; students: number };
}

export interface iClassFreq {
  class: iClass;
  school: iWithSchool;
  year: iYear;
  infreq: number;
}

export interface iClassSchoolList extends iClassFreq {
  _count: { frequencies: number; students: number };
}

export interface iClassWithSchoolDash {
  class: iClass;
  infreq: number;
  _count: { students: number };
}

export interface iClassWithSchool {
  class: iClass;
  school: iWithSchool;
  year: iYear;
  students: iStudentClass[];
  _count: { frequencies: number; students: number };
  infrequency: number;
}

export type iClassRequest = z.infer<typeof classCreateSchema>;

export type iClassSchoolRequest = z.infer<typeof classSchoolCreateSchema>;
