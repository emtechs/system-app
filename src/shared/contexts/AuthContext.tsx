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
  iRecoveryRequest,
  iUser,
  iWorkSchool,
} from "../interfaces";
import { apiUsingNow, postLogin, postRecovery } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "./ModalContext";
import { AxiosError } from "axios";
import { useAppThemeContext } from ".";

interface iAuthContextData {
  logout: () => void;
  accessToken: string | undefined;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  isAuthenticated: boolean;
  login: (data: iLoginRequest) => Promise<void>;
  recovery: (data: iRecoveryRequest) => Promise<void>;
  userData: iUser | undefined;
  setUserData: Dispatch<SetStateAction<iUser | undefined>>;
  schoolData: iWorkSchool | undefined;
  setSchoolData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  dashData: iDash | undefined;
  setDashData: Dispatch<SetStateAction<iDash | undefined>>;
}

const AuthContext = createContext({} as iAuthContextData);

export const AuthProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { setAnchorEl } = useModalContext();
  const [accessToken, setAccessToken] = useState<string>();
  const [userData, setUserData] = useState<iUser>();
  const [schoolData, setSchoolData] = useState<iWorkSchool>();
  const [dashData, setDashData] = useState<iDash>();

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
          setLoading(false);
        })
        .catch(() => {
          setAccessToken(undefined);
          setUserData(undefined);
          setDashData(undefined);
          setSchoolData(undefined);
          setLoading(false);
        });
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
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          toast.error(
            "Conta desativada, entre em contato com o administrador!"
          );
        } else {
          toast.error("Combinação de Usuário e Senha incorretos");
        }
      }
    }
  }, []);

  const handleRecovey = useCallback(async (data: iRecoveryRequest) => {
    try {
      setLoading(true);
      await postRecovery(data);
      toast.success("Siga as instruções enviadas no email da sua conta");
      navigate("/");
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("@EMTechs:token");
    setAccessToken(undefined);
    setUserData(undefined);
    setDashData(undefined);
    setSchoolData(undefined);
    setAnchorEl(null);
    navigate("/login");
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        accessToken,
        recovery: handleRecovey,
        setAccessToken,
        dashData,
        schoolData,
        setDashData,
        setSchoolData,
        setUserData,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
