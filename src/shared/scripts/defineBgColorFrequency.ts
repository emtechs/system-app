import { Theme } from "@mui/material";
import { iStatusStudent } from "../interfaces";

export const defineBgColorFrequency = (
  status: iStatusStudent,
  theme: Theme
) => {
  switch (status) {
    case "PRESENTED":
      return theme.palette.success.main;

    case "MISSED":
      return theme.palette.error.main;

    case "JUSTIFIED":
      return theme.palette.warning.dark;
  }
};
