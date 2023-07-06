import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { iUser } from "../../../shared/interfaces";
import { useAppThemeContext } from "../../../shared/contexts";
import { AccountBox } from "@mui/icons-material";

interface iUserProps {
  user?: iUser;
}

export const User = ({ user }: iUserProps) => {
  const { theme } = useAppThemeContext();
  return (
    <Grid item xs={12} md={3}>
      <Box mb={2} component={Paper}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height={theme.spacing(7)}
          p={1}
        >
          <Typography
            component="div"
            variant="h6"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <AccountBox />
            Meu Cadastro
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={1} p={1}>
          <Typography
            component="div"
            display="flex"
            gap={1}
            fontWeight="bolder"
          >
            Nome: <Typography variant="subtitle2">{user?.name}</Typography>
          </Typography>
          <Typography
            component="div"
            display="flex"
            gap={1}
            fontWeight="bolder"
          >
            CPF: <Typography variant="subtitle2">{user?.cpf}</Typography>
          </Typography>
          <Typography
            component="div"
            display="flex"
            gap={1}
            fontWeight="bolder"
          >
            E-mail: <Typography variant="subtitle2">{user?.email}</Typography>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
