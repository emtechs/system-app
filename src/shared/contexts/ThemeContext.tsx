import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { iChildren } from "../interfaces";
import { Theme } from "../themes";
import {
  Backdrop,
  CircularProgress,
  Theme as iTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

interface iThemeContextProps {
  theme: iTheme;
  smDown: boolean;
  mdDown: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext({} as iThemeContextProps);

export const AppThemeProvider = ({ children }: iChildren) => {
  const theme = Theme;
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);

  return (
    <ThemeContext.Provider value={{ mdDown, setLoading, smDown, theme }}>
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
