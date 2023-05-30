import { iClassSchool } from "./class.interfaces";

export interface iStudent {
  id: string;
  name: string;
  registry: string;
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
  infreq: number;
  presented: number;
  justified: number;
  missed: number;
  total_frequencies: number;
  infrequency: number;
}

export interface iStudentDash extends iStudentFrequency {
  classes: {
    class: iClassSchool;
  }[];
}
