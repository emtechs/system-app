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
  iWorkSchool,
} from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext, useAuthContext, usePaginationContext } from ".";
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
  getSchools: (id: string, query: string, take: number) => void;
  listSchoolServerData: iWorkSchool[] | undefined;
  setListSchoolServerData: Dispatch<SetStateAction<iWorkSchool[] | undefined>>;
  labelUser: string;
  userSelect: iUser | undefined;
  loadingLabelUser: boolean;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError, mdDown, adaptName } =
    useAppThemeContext();
  const { setDashData, setUserData } = useAuthContext();
  const { setIsLoading, setCount, define_step } = usePaginationContext();
  const [loadingLabelUser, setLoadingLabelUser] = useState(true);
  const [labelUser, setLabelUser] = useState("");
  const [updateUserData, setUpdateUserData] = useState<iUser>();
  const [userSelect, setUserSelect] = useState<iUser>();
  const [listSchoolServerData, setListSchoolServerData] =
    useState<iWorkSchool[]>();

  const userRetrieve = useCallback(
    (id: string) => {
      let name = "";
      setLoadingLabelUser(true);
      apiUser
        .retrieve(id)
        .then((res) => {
          setUserSelect(res);
          name = res.name;
          if (mdDown) name = adaptName(name, 15);
          setLabelUser(name);
        })
        .catch(() => navigate("/"))
        .finally(() => setLoadingLabelUser(false));
    },
    [mdDown]
  );

  const getSchools = useCallback(
    (id: string, query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiUser
          .schoolsServer(id, query)
          .then((res) => {
            setListSchoolServerData(res.result);
            setUserSelect(res.user);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiUser
          .schoolsServer(id, query)
          .then((res) => {
            setListSchoolServerData(res.result);
            setUserSelect(res.user);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

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
        getSchools,
        listSchoolServerData,
        userSelect,
        setListSchoolServerData,
        loadingLabelUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
