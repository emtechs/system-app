import { Avatar, Box, List, Paper, useTheme } from "@mui/material";
import { Class, Frequency, Report, School, Student, User } from "./options";

export const DashboardAdmin = () => {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.background.default}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={theme.spacing(2)}
        height={theme.spacing(5)}
      >
        <Box>
          <img
            height={theme.spacing(8)}
            src="/pref_massape.png"
            alt="Prefeitura de Massapê"
          />
        </Box>
        <Box>
          <Avatar>L</Avatar>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={theme.spacing(2)}
      >
        <List component="nav">
          <User />
          <School />
          <Class />
          <Student />
          <Frequency />
          <Report />
        </List>
        <Box component={Paper}></Box>
      </Box>
    </Box>
  );
};
