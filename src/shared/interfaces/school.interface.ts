import { z } from "zod";
import {
  classCreateSchema,
  schoolCreateSchema,
  studentCreateSchema,
} from "../schemas";
import { iDash } from ".";

export interface iSchool {
  id: string;
  name: string;
  is_active: boolean;
  created_at: Date;
}

export interface iWorkSchool {
  id: string;
  dash: iDash;
  school: iSchool;
}

export interface iClass {
  id: string;
  name: string;
  is_active: boolean;
  created_at: Date;
}

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iClassRequest = z.infer<typeof classCreateSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;
