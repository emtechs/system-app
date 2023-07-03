import { ReactNode } from "react";

export interface iChildren {
  children: ReactNode;
}

export interface iDialogBaseProps {
  open: boolean;
  onClose: () => void;
}

export interface iButtonBaseProps {
  title: string;
  href?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
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
