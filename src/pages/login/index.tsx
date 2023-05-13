import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Login as LoginIcon, LockReset } from "@mui/icons-material";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from "react-hook-form-mui";
import { loginSchema, recoverySchema } from "../../shared/schemas";
import { useAuthContext } from "../../shared/contexts";
import { iChildren } from "../../shared/interfaces";
import { useState } from "react";

const BoxResp = ({ children }: iChildren) => {
  const matches = useMediaQuery("(max-width:305px)");
  const dateData = new Date();
  if (matches) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="80vw"
      >
        <img src="/pref_massape.png" width="100%" />
        {children}
        <Typography fontSize="0.7rem">
          {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
        </Typography>
      </Box>
    );
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <img src="/pref_massape.png" />
      {children}
      <Typography>
        {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
      </Typography>
    </Box>
  );
};

export const Login = () => {
  const { login, recovery } = useAuthContext();
  const matches = useMediaQuery("(max-width:395px)");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Box
        component={Paper}
        width="100vw"
        maxWidth={400}
        display="flex"
        justifyContent="center"
        padding={matches ? 0 : 8}
        paddingTop={8}
        paddingBottom={8}
      >
        {isLogin ? (
          <FormContainer onSuccess={login} resolver={zodResolver(loginSchema)}>
            <BoxResp>
              <TextFieldElement
                name="login"
                label="Usuário"
                required
                fullWidth
              />
              <PasswordElement
                name="password"
                label="Senha"
                required
                fullWidth
              />
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
                fullWidth
              >
                Entrar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LockReset />}
                onClick={() => setIsLogin(false)}
                fullWidth
              >
                Recuperar Senha
              </Button>
            </BoxResp>
          </FormContainer>
        ) : (
          <FormContainer
            onSuccess={recovery}
            resolver={zodResolver(recoverySchema)}
          >
            <BoxResp>
              <TextFieldElement
                name="login"
                label="Usuário"
                required
                fullWidth
              />

              <Button
                variant="contained"
                color="secondary"
                startIcon={<LockReset />}
                type="submit"
                fullWidth
              >
                Recuperar Senha
              </Button>
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => setIsLogin(true)}
                fullWidth
              >
                Entrar
              </Button>
            </BoxResp>
          </FormContainer>
        )}
      </Box>
    </Container>
  );
};
