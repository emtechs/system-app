import { ReactNode } from "react";

export interface iChildren {
  children: ReactNode;
}

export interface iTable extends iChildren {
  is_active?: boolean;
  headCells: iheadCell[];
}

export interface iPageProps {
  back?: string;
}

export interface iheadCell {
  order?: string;
  numeric: boolean;
  label: string;
}
