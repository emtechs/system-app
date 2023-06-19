import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  iChildren,
  iDash,
  iLoginRequest,
  iRecoveryPasswordRequest,
  iRecoveryRequest,
  iSchool,
  iUser,
  iYear,
} from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "./ThemeContext";
import { useDrawerContext } from "./DrawerContext";
import { useModalContext } from "./ModalContext";
import { apiAuth, apiCalendar, apiUser, apiUsingNow } from "../services";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface iAuthContextData {
  logout: () => void;
  accessToken: string | undefined;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  isAuthenticated: boolean;
  login: (data: iLoginRequest) => Promise<void>;
  recovery: (data: iRecoveryRequest) => Promise<void>;
  recoveryPassword: (
    data: iRecoveryPasswordRequest,
    userId: string,
    token: string
  ) => Promise<void>;
  userData: iUser | undefined;
  setUserData: Dispatch<SetStateAction<iUser | undefined>>;
  dashData: iDash | undefined;
  setDashData: Dispatch<SetStateAction<iDash | undefined>>;
  yearData: iYear | undefined;
  schoolData: iSchool | undefined;
  setSchoolData: Dispatch<SetStateAction<iSchool | undefined>>;
}

const AuthContext = createContext({} as iAuthContextData);

export const AuthProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { handleClick } = useDrawerContext();
  const { setAnchorEl } = useModalContext();
  const [accessToken, setAccessToken] = useState<string>();
  const [userData, setUserData] = useState<iUser>();
  const [dashData, setDashData] = useState<iDash>();
  const [yearData, setYearData] = useState<iYear>();
  const [schoolData, setSchoolData] = useState<iSchool>();

  useEffect(() => {
    const accessToken = localStorage.getItem("@EMTechs:token");

    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      apiUser
        .profile(accessToken)
        .then((res) => {
          apiUsingNow.defaults.headers.authorization = `Bearer ${accessToken}`;
          setUserData(res);
          setDashData(res.dash);
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            if (e.response?.status === 401) {
              localStorage.removeItem("@EMTechs:token");
              setAccessToken(undefined);
            }
          }
        })
        .finally(() => setLoading(false));

      setLoading(true);
      apiCalendar
        .year(accessToken, dayjs().year())
        .then((res) => {
          setYearData(res);
        })
        .finally(() => setLoading(false));
    }
  }, [accessToken]);

  const handleLogin = useCallback(async (data: iLoginRequest) => {
    try {
      setLoading(true);
      const { token } = await apiAuth.login(data);
      localStorage.setItem("@EMTechs:token", token);
      setAccessToken(token);
      toast.success("Login realizado com sucesso");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          toast.error(
            "Conta desativada, entre em contato com o administrador!"
          );
        } else {
          toast.error("Combinação de Usuário e Senha incorretos");
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRecovey = useCallback(async (data: iRecoveryRequest) => {
    try {
      setLoading(true);
      await apiAuth.recovery(data);
      toast.success("Siga as instruções enviadas no email da sua conta");
      navigate("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          toast.error(
            "Conta desativada, entre em contato com o administrador!"
          );
        } else if (e.response?.status === 404) {
          toast.error(
            "Usuário não cadastrado, entre em contato com o administrador!"
          );
        } else {
          toast.error(
            "Nenhum email cadastrado para essa conta, entre em contato com o administrador!"
          );
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRecoveyPassword = useCallback(
    async (data: iRecoveryPasswordRequest, userId: string, token: string) => {
      try {
        setLoading(true);
        await apiAuth.passwordRecovery(data, userId, token);
        toast.success("Senha alterada com sucesso");
      } catch (e) {
        toast.error("Link expirado, solicite um novo link na tela de login!");
      } finally {
        setLoading(false);
        navigate("/");
      }
    },
    []
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("@EMTechs:token");
    setAccessToken(undefined);
    setSchoolData(undefined);
    setUserData(undefined);
    setDashData(undefined);
    setAnchorEl(null);
    handleClick();
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        recovery: handleRecovey,
        recoveryPassword: handleRecoveyPassword,
        accessToken,
        setAccessToken,
        dashData,
        setDashData,
        setUserData,
        userData,
        yearData,
        schoolData,
        setSchoolData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
