import { z } from "zod";
import {
  defineServerSchema,
  schoolClassCreateSchema,
  schoolCreateSchema,
  schoolImportSchema,
  serverCreateSchema,
  studentCreateSchema,
  studentImportSchema,
} from "../schemas";
import { iDash, iDiretor, iRole } from "./user.interfaces";

export interface iDialogSchoolProps {
  school: iSchool;
}

export interface iDashSchool {
  frequencies: number;
  day_infreq?: number;
  school_infreq: number;
  frequencyOpen: number;
  classTotal: number;
  stundents: number;
}

export interface iSchool {
  id: string;
  label: string;
  name: string;
  is_active: boolean;
  director?: iDiretor;
  is_class: boolean;
}

export interface iSchoolClass extends iSchool {
  classes: number;
  students: number;
  frequencies: number;
  servers: number;
  infrequency: number;
}

export interface iWorkSchool {
  dash: iDash;
  role: iRole;
  school: iSchool;
}

export interface iSchoolServer {
  role: iRole;
  dash: iDash;
  server: iServer;
}

interface iServer {
  id: string;
  name: string;
  cpf: string;
}

export interface iWithSchool {
  id: string;
  name: string;
}

export type iServerRequest = z.infer<typeof serverCreateSchema>;

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iSchoolClassRequest = z.infer<typeof schoolClassCreateSchema>;

export type iSchoolServerRequest = z.infer<typeof defineServerSchema>;

export type iSchoolImportRequest = z.infer<typeof schoolImportSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;
