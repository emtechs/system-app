import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  iChildren,
  iUser,
  iUserFirstRequest,
  iUserPasswordRequest,
  iUserRequest,
  iUserUpdateRequest,
} from "../interfaces";
import { apiUsingNow, patchUser, postUser } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext, useAuthContext, useModalProfileContext } from ".";

interface iUserContextData {
  create: (data: iUserRequest) => Promise<void>;
  editPassword: (id: string, data: iUserPasswordRequest) => Promise<void>;
  first: (id: string, data: iUserFirstRequest) => Promise<void>;
  updateUser: (id: string, data: iUserUpdateRequest) => Promise<void>;
  userData: iUser | undefined;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { accessToken, setAccessToken } = useAuthContext();
  const { setOpenEditProfile, setOpenEditPassword } = useModalProfileContext();
  const [userData, setUserData] = useState<iUser>();

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
          setLoading(false);
        })
        .catch(() => {
          setAccessToken(undefined);
          setLoading(false);
        });
    }
  }, [accessToken]);

  const handleCreateUser = useCallback(async (data: iUserRequest) => {
    try {
      setLoading(true);
      await postUser(data);
      toast.success(
        "Conta criada com sucesso, aguarde até o Administrador autorizar seu acesso!"
      );
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Conta já criada, entre em contato com o suporte!");
    }
  }, []);

  const handleFirstUser = useCallback(
    async (id: string, data: iUserFirstRequest) => {
      try {
        setLoading(true);
        const user = await patchUser(id, data);
        toast.success("Dados cadastrados com sucesso");
        setUserData(user);
        navigate("/");
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar os dados no momento!");
      }
    },
    []
  );

  const handleUpdateUser = useCallback(
    async (id: string, data: iUserUpdateRequest) => {
      try {
        setLoading(true);
        const user = await patchUser(id, data);
        toast.success("Dados alterado com sucesso");
        setUserData(user);
        setOpenEditProfile(false);
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error("Não foi possível atualizar os dados no momento!");
        setOpenEditProfile(false);
      }
    },
    []
  );

  const handlePasswordUser = useCallback(
    async (id: string, data: iUserPasswordRequest) => {
      try {
        setLoading(true);
        await patchUser(id, data);
        toast.success("Senha alterada com sucesso");
        setOpenEditPassword(false);
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error("Senha atual incorreta!");
        setOpenEditPassword(false);
      }
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        userData,
        create: handleCreateUser,
        first: handleFirstUser,
        updateUser: handleUpdateUser,
        editPassword: handlePasswordUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
