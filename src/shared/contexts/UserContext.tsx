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
  iSelectBase,
  iUser,
  iUserFirstRequest,
  iUserPasswordRequest,
  iUserSecretRequest,
  iUserUpdateRequest,
} from "../interfaces";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { apiUser } from "../services";
import { useAppThemeContext } from "./ThemeContext";
import { useAuthContext } from "./AuthContext";

interface iUserContextData {
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
  userDataRetrieve: (id: string) => void;
  loadingUser: boolean;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  rolesData: iSelectBase[] | undefined;
  setRolesData: Dispatch<SetStateAction<iSelectBase[] | undefined>>;
  userRetrieve: iUser | undefined;
  setUserRetrieve: Dispatch<SetStateAction<iUser | undefined>>;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { setDashData, setUserData } = useAuthContext();
  const [updateUserData, setUpdateUserData] = useState<iUser>();
  const [loadingUser, setLoadingUser] = useState(true);
  const [search, setSearch] = useState<string>();
  const [rolesData, setRolesData] = useState<iSelectBase[]>();
  const [userRetrieve, setUserRetrieve] = useState<iUser>();

  const userDataRetrieve = useCallback((id: string) => {
    setLoadingUser(true);
    apiUser
      .retrieve(id)
      .then((res) => setUserRetrieve(res))
      .catch(() => navigate("/"))
      .finally(() => setLoadingUser(false));
  }, []);

  const handleCreateUserSecret = useCallback(
    async (data: iUserSecretRequest, back?: string) => {
      try {
        setLoading(true);
        const query = "?allNotServ=true";
        await apiUser.create(data, query);
        handleSucess("Secretário cadastrado com sucesso!");
      } catch {
        handleError("Não foi possível cadastrar o secretário no momento!");
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
        handleSucess("Dados cadastrados com sucesso");
        setUserData(user);
        setDashData(user.dash);
        navigate("/");
      } catch {
        handleError("Não foi possível cadastrar os dados no momento!");
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
        handleSucess("Dados alterado com sucesso");
        setUserData(user);
        navigate("/");
      } catch {
        handleError("Não foi possível atualizar os dados no momento!");
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
        if (!is_all) handleSucess("Sucesso ao alterar o estado do usuário!");
        if (back) navigate(back);
      } catch {
        if (!is_all)
          handleError(
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
        handleSucess("Senha alterada com sucesso");
        navigate("/");
      } catch {
        handleError("Senha atual incorreta!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        createSecret: handleCreateUserSecret,
        first: handleFirstUser,
        updateUser: handleUpdateUser,
        editPassword: handlePasswordUser,
        updateAllUser: handleUpdateAllUser,
        updateUserData,
        setUpdateUserData,
        userRetrieve,
        loadingUser,
        search,
        setSearch,
        rolesData,
        setRolesData,
        setUserRetrieve,
        userDataRetrieve,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
