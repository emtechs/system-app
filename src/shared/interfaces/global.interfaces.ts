import { ReactNode } from "react";

export interface iChildren {
  children: ReactNode;
}

export interface iTable extends iChildren {
  headCells: iheadCell[];
  is_body?: boolean;
  is_pagination?: boolean;
  is_message?: boolean;
  message?: string;
}

export interface iPageProps {
  back?: string;
}

export interface iheadCell {
  order?: string;
  numeric: boolean;
  label: string;
}
