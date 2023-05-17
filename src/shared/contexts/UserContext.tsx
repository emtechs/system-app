import { createContext, useCallback, useContext } from "react";
import {
  iChildren,
  iUserFirstRequest,
  iUserPasswordRequest,
  iUserRequest,
  iUserUpdateRequest,
} from "../interfaces";
import { patchUser, postUser } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext, useAuthContext, useModalContext } from ".";

interface iUserContextData {
  create: (data: iUserRequest) => Promise<void>;
  editPassword: (id: string, data: iUserPasswordRequest) => Promise<void>;
  first: (id: string, data: iUserFirstRequest) => Promise<void>;
  updateUser: (id: string, data: iUserUpdateRequest) => Promise<void>;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { setDashData, setSchoolData, setUserData } = useAuthContext();
  const { setOpenEditProfile, setOpenEditPassword } = useModalContext();

  const handleCreateUser = useCallback(async (data: iUserRequest) => {
    try {
      setLoading(true);
      await postUser(data);
      toast.success("Usuário cadastrado com sucesso!");
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
      toast.error("Não foi possível cadastrar o usuário no momento!");
    }
  }, []);

  const handleFirstUser = useCallback(
    async (id: string, data: iUserFirstRequest) => {
      try {
        setLoading(true);
        const user = await patchUser(id, data);
        toast.success("Dados cadastrados com sucesso");
        setUserData(user);
        setDashData(user.dash);
        if (user.work_school.length === 0) setSchoolData(undefined);
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
