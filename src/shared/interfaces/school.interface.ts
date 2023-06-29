import { z } from "zod";
import {
  schoolCreateSchema,
  schoolImportSchema,
  serverCreateSchema,
  studentCreateSchema,
  studentImportSchema,
} from "../schemas";
import { iDash, iDiretor, iRole } from "./user.interfaces";

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
  director?: iDiretor;
}

export interface iSchoolClass {
  id: string;
  label: string;
  name: string;
  director: iDiretor;
  classes: number;
  students: number;
  frequencies: number;
  servers: number;
  infrequency: number;
}

interface iServer {
  id: string;
  name: string;
  cpf: string;
}

export interface iSchoolServer {
  role: iRole;
  dash: iDash;
  server: iServer;
}

export interface iWorkSchool {
  dash: iDash;
  role: iRole;
  school: iSchool;
}

export interface iWithSchool {
  id: string;
  name: string;
}

export type iServerRequest = z.infer<typeof serverCreateSchema>;

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iSchoolImportRequest = z.infer<typeof schoolImportSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;
