import { ReactNode, SyntheticEvent } from "react";

export interface iChildren {
  children: ReactNode;
}

export interface iDialogBaseProps {
  open: boolean;
  onClose: () => void;
}

export interface iLabelBaseProps {
  clickable?: boolean;
}

export interface iTabsBaseProps {
  value?: string;
  handleChange: (_event: SyntheticEvent, newValue: string) => void;
}

export interface iViewBaseProps {
  id?: string;
}

export interface iSelectBase {
  id: string;
  label: string;
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
  link?: "div";
}

export type iLinkComp = { component: "div" } | object;

export interface iPageProps {
  back?: string;
}

export interface iheadCell {
  order?: string;
  numeric: "right" | "left";
  label: string;
}
