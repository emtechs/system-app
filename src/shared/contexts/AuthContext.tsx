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
import { iChildren, iLoginRequest, iRecoveryRequest } from "../interfaces";
import { postLogin, postRecovery } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useModalProfileContext } from "./ModalProfileContext";
import { AxiosError } from "axios";
import { useAppThemeContext } from ".";

interface iAuthContextData {
  logout: () => void;
  accessToken: string | undefined;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  isAuthenticated: boolean;
  login: (data: iLoginRequest) => Promise<void>;
  recovery: (data: iRecoveryRequest) => Promise<void>;
}

const AuthContext = createContext({} as iAuthContextData);

export const AuthProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { setAnchorEl } = useModalProfileContext();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem("@EMTechs:token");

    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
