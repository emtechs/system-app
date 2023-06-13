import { z } from "zod";
import { classCreateSchema } from "../schemas";
import { iWithSchool } from "./school.interface";
import { iStudent, iStudentWithSchool } from "./student.interface";
import { iYear } from "./calendar.interfaces";

export interface iClass {
  id: string;
  name: string;
}

export interface iClassSchool {
  class: iClass;
  school_id: string;
  year_id: string;
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
  class_infreq: number;
}

export interface iClassSchoolList extends iClassFreq {
  _count: { frequencies: number; students: number };
}

export interface iClassWithSchoolDash {
  class: iClass;
  class_infreq: number;
  _count: { students: number };
}

export interface iClassWithSchool {
  class: iClass;
  class_infreq: number;
  school: iWithSchool;
  year: iYear;
  students: iStudentWithSchool[];
  _count: { frequencies: number; students: number };
  infrequency: number;
}

export type iClassRequest = z.infer<typeof classCreateSchema>;
