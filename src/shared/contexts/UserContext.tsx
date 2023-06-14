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
  iUserDirectorRequest,
  iUserFirstRequest,
  iUserPasswordRequest,
  iUserSecretRequest,
  iUserUpdateRequest,
} from "../interfaces";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext, useAuthContext } from ".";
import { FieldValues } from "react-hook-form";
import { apiUser } from "../services";

interface iUserContextData {
  createAdm: (data: iUserAdmRequest) => Promise<void>;
  createDirector: (data: iUserDirectorRequest) => Promise<void>;
  createSecret: (data: iUserSecretRequest, back?: string) => Promise<void>;
  editPassword: (id: string, data: iUserPasswordRequest) => Promise<void>;
  first: (id: string, data: iUserFirstRequest) => Promise<void>;
  updateUser: (id: string, data: iUserUpdateRequest) => Promise<void>;
  updateAllUser: (
    id: string,
    data: FieldValues,
    is_all: boolean,
    back?: string
  ) => Promise<void>;
  updateUserData: iUser | undefined;
  setUpdateUserData: Dispatch<SetStateAction<iUser | undefined>>;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { setDashData, setSchoolData, setUserData } = useAuthContext();
  const [updateUserData, setUpdateUserData] = useState<iUser>();

  const handleCreateUserAdm = useCallback(async (data: iUserAdmRequest) => {
    try {
      setLoading(true);
      await apiUser.create(data);
      toast.success("Administrador cadastrado com sucesso!");
    } catch {
      toast.error("Não foi possível cadastrar o administrador no momento!");
    } finally {
      setLoading(false);
      navigate("/");
    }
  }, []);

  const handleCreateDirector = useCallback(
    async (data: iUserDirectorRequest) => {
      try {
        setLoading(true);
        await apiUser.create(data);
        toast.success("Diretor cadastrado com sucesso!");
        navigate("/");
      } catch {
        toast.error("Não foi possível cadastrar o Diretor no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleCreateUserSecret = useCallback(
    async (data: iUserSecretRequest, back?: string) => {
      try {
        setLoading(true);
        const query = "?allNotServ=true";
        await apiUser.create(data, query);
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
        const user = await apiUser.update(id, data);
        toast.success("Dados cadastrados com sucesso");
        setUserData(user);
        setDashData(user.dash);
        if (user.work_school.length === 0) setSchoolData(undefined);
        navigate("/");
      } catch {
        toast.error("Não foi possível cadastrar os dados no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateUser = useCallback(
    async (id: string, data: iUserUpdateRequest) => {
      try {
        setLoading(true);
        const user = await apiUser.update(id, data);
        toast.success("Dados alterado com sucesso");
        setUserData(user);
        navigate("/");
      } catch {
        toast.error("Não foi possível atualizar os dados no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateAllUser = useCallback(
    async (id: string, data: FieldValues, is_all: boolean, back?: string) => {
      try {
        setLoading(true);
        const user = await apiUser.update(id, data);
        setUpdateUserData(user);
        if (!is_all) toast.success("Sucesso ao alterar o estado do usuário!");
        if (back) navigate(back);
      } catch {
        if (!is_all)
          toast.error(
            "Não foi possível atualizar o estado do usuário no momento!"
          );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handlePasswordUser = useCallback(
    async (id: string, data: iUserPasswordRequest) => {
      try {
        setLoading(true);
        await apiUser.update(id, data);
        toast.success("Senha alterada com sucesso");
        navigate("/");
      } catch {
        toast.error("Senha atual incorreta!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        createAdm: handleCreateUserAdm,
        createDirector: handleCreateDirector,
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
