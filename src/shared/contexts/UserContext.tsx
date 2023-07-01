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
  userRetrieve: (id: string) => void;
  labelUser: () => string;
  labelUserId: (id: string) => string;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError, mdDown, adaptName } =
    useAppThemeContext();
  const { setDashData, setUserData } = useAuthContext();
  const [updateUserData, setUpdateUserData] = useState<iUser>();
  const [userSelect, setUserSelect] = useState<iUser>();

  const userRetrieve = useCallback((id: string) => {
    setLoading(true);
    apiUser
      .retrieve(id)
      .then((res) => setUserSelect(res))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  const labelUserId = useCallback(
    (id: string) => {
      let name = "";
      setLoading(true);
      apiUser
        .retrieve(id)
        .then((res) => (name = res.name))
        .finally(() => setLoading(false));

      if (mdDown) return adaptName(name, 15);

      return name;
    },
    [mdDown]
  );

  const labelUser = useCallback(() => {
    if (userSelect) {
      if (mdDown) return adaptName(userSelect.name, 15);
      return userSelect.name;
    }
    return "";
  }, [userSelect, mdDown]);

  const handleCreateUserAdm = useCallback(async (data: iUserAdmRequest) => {
    try {
      setLoading(true);
      await apiUser.create(data);
      handleSucess("Administrador cadastrado com sucesso!");
    } catch {
      handleError("Não foi possível cadastrar o administrador no momento!");
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
        handleSucess("Diretor cadastrado com sucesso!");
        navigate("/");
      } catch {
        handleError("Não foi possível cadastrar o Diretor no momento!");
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
        createAdm: handleCreateUserAdm,
        createDirector: handleCreateDirector,
        createSecret: handleCreateUserSecret,
        first: handleFirstUser,
        updateUser: handleUpdateUser,
        editPassword: handlePasswordUser,
        updateAllUser: handleUpdateAllUser,
        updateUserData,
        setUpdateUserData,
        labelUser,
        userRetrieve,
        labelUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
