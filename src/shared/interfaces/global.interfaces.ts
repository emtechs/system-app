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
