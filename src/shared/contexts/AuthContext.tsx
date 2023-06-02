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
  iUser,
  iWorkSchool,
} from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "./ThemeContext";
import { useDrawerContext } from "./DrawerContext";
import { useModalContext } from "./ModalContext";
import {
  apiUsingNow,
  postLogin,
  postPasswordRecovery,
  postRecovery,
} from "../services";
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
  schoolData: iWorkSchool | undefined;
  setSchoolData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  dashData: iDash | undefined;
  setDashData: Dispatch<SetStateAction<iDash | undefined>>;
  schoolYear: string | undefined;
}

const AuthContext = createContext({} as iAuthContextData);

export const AuthProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { handleClick } = useDrawerContext();
  const { setAnchorEl } = useModalContext();
  const [accessToken, setAccessToken] = useState<string>();
  const [userData, setUserData] = useState<iUser>();
  const [schoolData, setSchoolData] = useState<iWorkSchool>();
  const [dashData, setDashData] = useState<iDash>();
  const [schoolYear, setSchoolYear] = useState<string>();

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
      apiUsingNow
        .get<iUser>("users/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          apiUsingNow.defaults.headers.authorization = `Bearer ${accessToken}`;
          setUserData(res.data);
          setDashData(res.data.dash);
          if (res.data.work_school.length === 0) setSchoolData(undefined);
        })
        .finally(() => {
          setLoading(false);
        });
      setLoading(true);
      const year = dayjs().year();
      apiUsingNow
        .get<{ id: string }>(`/schools/year/${year}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setSchoolYear(res.data.id);
        })
        .finally(() => setLoading(false));
    }
  }, [accessToken]);

  const handleLogin = useCallback(async (data: iLoginRequest) => {
    try {
      setLoading(true);
      const { token } = await postLogin(data);
      localStorage.setItem("@EMTechs:token", token);
      setAccessToken(token);
      toast.success("Login realizado com sucesso");
      navigate("/");
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
      await postRecovery(data);
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
        await postPasswordRecovery(data, userId, token);
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
    setUserData(undefined);
    setDashData(undefined);
    setSchoolData(undefined);
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
        schoolData,
        setDashData,
        setSchoolData,
        setUserData,
        userData,
        schoolYear,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
