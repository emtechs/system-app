import { iClass, iClassFreq } from "./class.interfaces";

export interface iStudent {
  id: string;
  name: string;
  registry: string;
  created_at: Date;
  presented: number;
  justified: number;
  missed: number;
  total_frequencies: number;
  infrequency: number;
}

export interface iStudentClass {
  student: {
    id: string;
    name: string;
    registry: string;
  };
}

export interface iStudentList extends iStudent {
  classes?: { class: iClassFreq }[];
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
