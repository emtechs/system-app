import { Add } from "@mui/icons-material";
import { Box, Button, Paper, TextField, useTheme } from "@mui/material";

export const Tools = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
    >
      <TextField placeholder="Pesquisar" size="small" />
      <Box flex={1} display="flex" justifyContent="end">
        <Button disableElevation variant="contained" endIcon={<Add />}>
          Novo
        </Button>
      </Box>
    </Box>
  );
};
