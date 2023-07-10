import { ReactNode, SyntheticEvent } from "react";

export interface iChildren {
  children: ReactNode;
}

export interface iDialogBaseProps {
  open: boolean;
  onClose: () => void;
}

export interface iTabsBaseProps {
  value: string;
  handleChange: (_event: SyntheticEvent, newValue: string) => void;
}

export interface iSelectBase {
  id: string;
  label: string;
}

export interface iViewBaseProps {
  search?: string;
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
