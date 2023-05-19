import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  iChildren,
  iUser,
  iUserAdmRequest,
  iUserFirstRequest,
  iUserPasswordRequest,
  iUserSecretRequest,
  iUserUpdateRequest,
} from "../interfaces";
import { patchUser, postUser } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext, useAuthContext, useModalContext } from ".";
import { FieldValues } from "react-hook-form";

interface iUserContextData {
  createAdm: (data: iUserAdmRequest, back?: string) => Promise<void>;
  createSecret: (data: iUserSecretRequest, back?: string) => Promise<void>;
  editPassword: (id: string, data: iUserPasswordRequest) => Promise<void>;
  first: (id: string, data: iUserFirstRequest) => Promise<void>;
  updateUser: (id: string, data: iUserUpdateRequest) => Promise<void>;
  updateAllUser: (
    id: string,
    data: FieldValues,
    is_all: boolean
  ) => Promise<void>;
  updateUserData: iUser | undefined;
  setUpdateUserData: Dispatch<SetStateAction<iUser | undefined>>;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { setDashData, setSchoolData, setUserData } = useAuthContext();
  const { setOpenEditProfile, setOpenEditPassword } = useModalContext();
  const [updateUserData, setUpdateUserData] = useState<iUser>();

  const handleCreateUserAdm = useCallback(
    async (data: iUserAdmRequest, back?: string) => {
      try {
        setLoading(true);
        await postUser(data);
        toast.success("Administrador cadastrado com sucesso!");
      } catch {
        toast.error("Não foi possível cadastrar o administrador no momento!");
      } finally {
        setLoading(false);
        navigate(back ? back : "/");
      }
    },
    []
  );

  const handleCreateUserSecret = useCallback(
    async (data: iUserSecretRequest, back?: string) => {
      try {
        setLoading(true);
        const query = "?allNotServ=true";
        await postUser(data, query);
        toast.success("Secretário cadastrado com sucesso!");
      } catch {
        toast.error("Não foi possível cadastrar o secretário no momento!");
      } finally {
        setLoading(false);
        navigate(back ? back : "/");
      }
    },
    []
  );

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

  const handleUpdateAllUser = useCallback(
    async (id: string, data: FieldValues, is_all: boolean) => {
      try {
        setLoading(true);
        const user = await patchUser(id, data);
        setUpdateUserData(user);
        if (!is_all) toast.success("Sucesso ao alterar o estado do usuário!");
        setLoading(false);
      } catch {
        setLoading(false);
        if (!is_all)
          toast.error(
            "Não foi possível atualizar o estado do usuário no momento!"
          );
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
        createAdm: handleCreateUserAdm,
        createSecret: handleCreateUserSecret,
        first: handleFirstUser,
        updateUser: handleUpdateUser,
        editPassword: handlePasswordUser,
        updateAllUser: handleUpdateAllUser,
        updateUserData,
        setUpdateUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
