import { z } from "zod";
import { classCreateSchema } from "../schemas";
import { iSchoolYear, iWithSchool } from "./school.interface";
import { iStudent, iStudentWithSchool } from "./student.interface";

export interface iClass {
  id: string;
  name: string;
}

export interface iClassSchool {
  class: iClass;
  school_id: string;
  school_year_id: string;
}

export interface iClassSelect extends iClass {
  label: string;
}

export interface iClassDash {
  class: iClass;
  class_infreq: number;
  school: iWithSchool;
  school_year: iSchoolYear;
  students: {
    student: iStudent;
  }[];
  _count: { frequencies: number; students: number };
}

export interface iClassFreq {
  class: iClass;
  school: iWithSchool;
  school_year: iSchoolYear;
  class_infreq: number;
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
  school_year: iSchoolYear;
  students: iStudentWithSchool[];
  _count: { frequencies: number; students: number };
  infrequency: number;
}

export type iClassRequest = z.infer<typeof classCreateSchema>;
