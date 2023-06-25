import { z } from "zod";
import { frequencyCreateSchema } from "../schemas";
import { iClassFreq } from "./class.interfaces";
import { iStudent } from "./student.interface";

export type iFrequencyRequest = z.infer<typeof frequencyCreateSchema>;

export type iStatusFrequency = "OPENED" | "CLOSED";

export type iStatusStudent = "PRESENTED" | "MISSED" | "JUSTIFIED";

interface iUserFreq {
  id: string;
  name: string;
  cpf: string;
}

export interface iFrequencyBase {
  id: string;
  date: string;
  status: iStatusFrequency;
  created_at: Date;
  finished_at: number;
  infrequency: number;
  class: iClassFreq;
}

interface iFrequencyInfreqBase extends iFrequencyBase {
  user: iUserFreq;
  _count: { students: number };
  infreq?: number;
  class_infreq?: number;
  school_frequencies?: number;
  school_infreq?: number;
}

export interface iFrequency extends iFrequencyInfreqBase {
  students: iFrequencyStudents[];
}

export interface iFrequencyWithInfreq extends iFrequencyInfreqBase {
  students: iFrequencyStudentsWithInfreq[];
}

export interface iFrequencyStudentsBase {
  id: string;
  status: iStatusStudent;
  justification?: string;
  updated_at?: string;
  student: iStudent;
}

export interface iFrequencyStudents extends iFrequencyStudentsBase {
  _count: { students: number };
}

export interface iFrequencyStudentsWithInfreq {
  id: string;
  status: iStatusStudent;
  justification?: string;
  updated_at?: string;
  name: string;
  registry: string;
  frequencyStudent_id: string;
  presences: number;
  justified: number;
  absences: number;
  frequencies: number;
  infrequency: number;
}
