import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Theme as iTheme,
  Snackbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { iChildren, iRole, iStatusStudent } from "../interfaces";
import { Theme } from "../themes";

interface iThemeContextProps {
  theme: iTheme;
  smDown: boolean;
  mdDown: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleSucess: (msg: string) => void;
  handleError: (msg: string) => void;
  adaptName: (name: string, max?: number) => string;
  defineBgColorFrequency: (status: iStatusStudent) => string;
  defineBgColorInfrequency: (infreq: number) => string;
  statusFrequencyPtBr: (
    status: iStatusStudent
  ) => "Presente" | "Faltou" | "Justificou";
  rolePtBr: (
    role: iRole
  ) => "Administrador" | "Diretor de Escola" | "Secretário" | "Servidor";
}

const ThemeContext = createContext({} as iThemeContextProps);

export const AppThemeProvider = ({ children }: iChildren) => {
  const theme = Theme;
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>();

  const adaptName = useCallback((name: string, max?: number) => {
    max = max ? max : 27;
    if (name.length > max) {
      const displayName = name.split(" ");
      let name4 = "";
      if (displayName[4]) {
        name4 = " " + displayName[4];
      }
      if (displayName[3].length < 3) {
        return (
          displayName[0] +
          " " +
          displayName[1] +
          " " +
          displayName[2][0] +
          "." +
          name4
        );
      }
      return (
        displayName[0] +
        " " +
        displayName[1] +
        " " +
        displayName[2] +
        " " +
        displayName[3][0] +
        "." +
        name4
      );
    }
    return name;
  }, []);

  const defineBgColorFrequency = useCallback((status: iStatusStudent) => {
    switch (status) {
      case "PRESENTED":
        return theme.palette.success.dark;

      case "MISSED":
        return theme.palette.error.dark;

      case "JUSTIFIED":
        return theme.palette.warning.dark;
    }
  }, []);

  const defineBgColorInfrequency = useCallback((infreq: number) => {
    if (infreq <= 30) return theme.palette.success.dark;

    if (infreq <= 65) return theme.palette.warning.dark;

    return theme.palette.error.dark;
  }, []);

  const rolePtBr = useCallback((role: iRole) => {
    switch (role) {
      case "ADMIN":
        return "Administrador";

      case "DIRET":
        return "Diretor de Escola";

      case "SECRET":
        return "Secretário";

      case "SERV":
        return "Servidor";
    }
  }, []);

  const statusFrequencyPtBr = useCallback((status: iStatusStudent) => {
    switch (status) {
      case "PRESENTED":
        return "Presente";

      case "MISSED":
        return "Faltou";

      case "JUSTIFIED":
        return "Justificou";
    }
  }, []);

  const handleSucess = useCallback((msg: string) => {
    setMessage(msg);
    setSeverity("success");
    setOpen(true);
  }, []);

  const handleError = useCallback((msg: string) => {
    setMessage(msg);
    setSeverity("error");
    setOpen(true);
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (event) {
      /* empty */
    }
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        handleError,
        handleSucess,
        mdDown,
        setLoading,
        smDown,
        theme,
        adaptName,
        defineBgColorFrequency,
        defineBgColorInfrequency,
        statusFrequencyPtBr,
        rolePtBr,
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
        <Backdrop
          sx={{
            color: theme.palette.secondary.main,
            zIndex: theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={
            mdDown
              ? { vertical: "bottom", horizontal: "center" }
              : { vertical: "top", horizontal: "right" }
          }
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(ThemeContext);
