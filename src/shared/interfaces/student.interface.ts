import { iClass, iClassFreq } from "./class.interfaces";

export interface iStudent {
  id: string;
  name: string;
  registry: string;
  created_at: Date;
  infreq: number;
}

export interface iStudentList extends iStudent {
  classes?: { class: iClassFreq }[];
}

export interface iStudentWithSchool extends iStudent {
  presented: number;
  justified: number;
  missed: number;
  total_frequencies: number;
  infrequency: number;
}

export interface iStudentFrequency extends iStudent {
  is_active: boolean;
  justify_disabled?: string;
  presented: number;
  justified: number;
  missed: number;
  total_frequencies: number;
  infrequency: number;
}

export interface iStudentDash extends iStudentFrequency {
  class: iClass;
}
