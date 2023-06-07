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

interface iMonth {
  month: number;
  name: string;
}

interface iFrequencyBase {
  id: string;
  date: string;
  status: iStatusFrequency;
  created_at: Date;
  finished_at: number;
  month?: iMonth;
  user: iUserFreq;
  class: iClassFreq;
  _count: { students: number };
  infrequency?: number;
  class_infreq?: number;
  school_infreq?: number;
}

export interface iFrequency extends iFrequencyBase {
  students: iFrequencyStudents[];
}

export interface iFrequencyWithInfreq extends iFrequencyBase {
  students: iFrequencyStudentsWithInfreq[];
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
