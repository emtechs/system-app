import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { iChildren } from "../interfaces";
import { Theme } from "../themes";
import { Backdrop, CircularProgress, ThemeProvider } from "@mui/material";

interface iThemeContextProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext({} as iThemeContextProps);

export const AppThemeProvider = ({ children }: iChildren) => {
  const theme = Theme;
  const [loading, setLoading] = useState(false);
  return (
    <ThemeContext.Provider value={{ setLoading }}>
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
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(ThemeContext);
