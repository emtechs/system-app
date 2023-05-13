import {
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

interface iAuthContextData {
  logout: () => void;
  accessToken: string | undefined;
  isAuthenticated: boolean;
  login: (data: iLoginRequest) => Promise<void>;
  recovery: (data: iRecoveryRequest) => Promise<void>;
}

const AuthContext = createContext({} as iAuthContextData);

export const AuthProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
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
      const { access: token } = await postLogin(data);
      localStorage.setItem("@EMTechs:token", token);
      setAccessToken(token);
      toast.success("Login realizado com sucesso");
      navigate("/");
    } catch {
      toast.error("Combinação de Username e Senha incorretos");
    }
  }, []);

  const handleRecovey = useCallback(async (data: iRecoveryRequest) => {
    try {
      const { access: token } = await postRecovery(data);
      toast.success("Siga as instruções enviadas no email da sua conta");
      navigate("/");
    } catch {
      toast.error("Usuário não cadastrado");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
