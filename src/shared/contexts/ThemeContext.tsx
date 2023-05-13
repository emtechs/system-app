import { createContext, useContext } from "react";
import { iChildren } from "../interfaces";
import { Theme } from "../themes";
import { Box, ThemeProvider } from "@mui/material";

const ThemeContext = createContext({});

export const AppThemeProvider = ({ children }: iChildren) => {
  const theme = Theme;
  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(ThemeContext);
