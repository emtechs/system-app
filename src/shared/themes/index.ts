import { createTheme } from "@mui/material";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#006CBE",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F8BB05",
      contrastText: "#FFFFFF",
    },
    background: { default: "#F9F9F9", paper: "#FFFFFF" },
  },
});
