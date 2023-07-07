import { iClass, iClassFreq } from "./class.interfaces";

export interface iStudent {
  id: string;
  name: string;
  registry: string;
  created_at: Date;
  infrequency: number;
  frequencies: {
    presented: number;
    justified: number;
    missed: number;
    total: number;
  };
  class: {
    id: string;
    name: string;
  };
  school: {
    id: string;
    name: string;
  };
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
