import { ReactNode } from "react";

export interface iChildren {
  children: ReactNode;
}

export interface iTable extends iChildren {
  isPagination?: boolean;
}

export interface iPageProps {
  back?: string;
}

export interface iheadCell {
  order?: string;
  numeric: boolean;
  label: string;
}
