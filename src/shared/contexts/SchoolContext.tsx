import {
  iChildren,
  iSchool,
  iSchoolImportRequest,
  iSchoolRequest,
  iSchoolServer,
  iSchoolServerRequest,
  iServerRequest,
  iWorkSchool,
  iYear,
} from "../interfaces";
import { FieldValues } from "react-hook-form";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "./ThemeContext";
import { apiSchool, apiUser } from "../services";
import { useAuthContext } from "./AuthContext";
import { usePaginationContext, useUserContext } from ".";

interface iSchoolContextData {
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  listSchoolData: iSchool[] | undefined;
  setListSchoolData: Dispatch<SetStateAction<iSchool[] | undefined>>;
  serversData: iSchoolServer[] | undefined;
  setServersData: Dispatch<SetStateAction<iSchoolServer[] | undefined>>;
  director: boolean[];
  setDirector: Dispatch<SetStateAction<boolean[]>>;
  is_director: () => "" | "&is_director=true" | "&is_director=false";
  schoolDataRetrieve: (id: string) => void;
  schoolDataAdminRetrieve: (id: string) => void;
  getSchool: (query: string, take: number) => void;
  getServers: (id: string, query: string, take: number) => void;
  createSchool: (data: iSchoolRequest) => Promise<void>;
  importSchool: (data: iSchoolImportRequest, back?: string) => Promise<void>;
  createServer: (data: iServerRequest, id: string) => Promise<void>;
  createSchoolServer: (
    data: iSchoolServerRequest,
    server_id: string
  ) => Promise<void>;
  updateSchool: (
    data: FieldValues,
    id: string,
    type: "nome" | "diretor" | "estado",
    query?: string,
    back?: string
  ) => Promise<void>;
  deleteServer: (school_id: string, server_id: string) => Promise<void>;
  clickListSchool: (school_id: string) => void;
  clickRetrieveSchool: (school_id: string, server_id: string) => void;
  loadingSchool: boolean;
  schoolId: string | undefined;
  listYear: iYear[] | undefined;
  disabled: boolean;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError, mdDown } =
    useAppThemeContext();
  const { setSchoolData, yearData, setSchoolDataAdmin } = useAuthContext();
  const { getSchools, setListSchoolServerData } = useUserContext();
  const { setIsLoading, setCount, define_step, setSkip, setPage } =
    usePaginationContext();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [serversData, setServersData] = useState<iSchoolServer[]>();
  const [schoolId, setSchoolId] = useState<string>();
  const [disabled, setDisabled] = useState(false);
  const [director, setDirector] = useState([true, true]);
  const [loadingSchool, setLoadingSchool] = useState(true);
  const [listYear, setListYear] = useState<iYear[]>();

  const clickListSchool = useCallback((school_id: string) => {
    setPage(0);
    setSkip(undefined);
    setServersData(undefined);
    navigate("/school/" + school_id);
  }, []);

  const clickRetrieveSchool = useCallback(
    (school_id: string, server_id: string) => {
      setPage(0);
      setSkip(undefined);
      setListSchoolServerData(undefined);
      navigate("/school/" + school_id + "/server/" + server_id);
    },
    []
  );

  const is_director = useCallback(() => {
    if (director[0] !== director[1]) {
      if (director[0]) return "&is_director=true";
      if (director[1]) return "&is_director=false";
    }
    return "";
  }, [director]);

  const schoolDataRetrieve = useCallback((id: string) => {
    setLoadingSchool(true);
    setLoading(true);
    apiSchool
      .retrieve(id)
      .then((res) => {
        setSchoolData(res.school);
        setListYear(res.years);
        if (res.years.length > 0) {
          setSchoolId(res.school.id);
          setDisabled(false);
        } else {
          setSchoolId(undefined);
          setDisabled(true);
        }
      })
      .catch(() => navigate("/"))
      .finally(() => {
        setLoadingSchool(false);
        setLoading(false);
      });
  }, []);

  const schoolDataAdminRetrieve = useCallback(
    (id: string) => {
      if (yearData) {
        setLoadingSchool(true);
        apiSchool
          .retrieveClass(id, yearData.id)
          .then((res) => setSchoolDataAdmin(res))
          .catch(() => navigate("/home/school"))
          .finally(() => setLoadingSchool(false));
      }
    },
    [yearData]
  );

  const getSchool = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiSchool
          .list(query)
          .then((res) => {
            setListSchoolData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiSchool
          .list(query)
          .then((res) => {
            setListSchoolData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const getServers = useCallback(
    (id: string, query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiSchool
          .listServers(id, query)
          .then((res) => {
            setServersData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiSchool
          .listServers(id, query)
          .then((res) => {
            setServersData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const handleCreateSchool = useCallback(async (data: iSchoolRequest) => {
    try {
      setLoading(true);
      const school = await apiSchool.create(data);
      handleSucess("A escola foi cadastrada com sucesso!");
      navigate("/school/" + school.id);
    } catch {
      handleError(
        "No momento, não foi possível cadastrar a escola. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateSchoolServer = useCallback(
    async (data: iSchoolServerRequest, server_id: string) => {
      try {
        setLoading(true);
        await apiSchool.createServer(data, server_id);
        handleSucess("O servidor foi cadastrada com sucesso na escola!");
        getSchools(server_id, "", 1);
      } catch {
        handleError(
          "No momento, não foi possível cadastrar o servidor na escola. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleImportSchool = useCallback(
    async (data: iSchoolImportRequest, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      try {
        setLoading(true);
        await apiSchool.impSchool(file);
        handleSucess("Escolas importadas com sucesso!");
        navigate(back ? back : "/");
      } catch {
        handleError("Não foi possível importar as escolas no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateSchool = useCallback(
    async (
      data: FieldValues,
      id: string,
      type: "nome" | "diretor" | "estado",
      query?: string,
      back?: string
    ) => {
      try {
        setLoading(true);
        const school = await apiSchool.update(data, id, query);
        setSchoolData(school);
        if (type === "diretor") getServers(school.id, "", 1);
        handleSucess(`Sucesso ao alterar o ${type} da Escola!`);
      } catch {
        handleError(
          `Não foi possível atualizar o ${type} da escola no momento!`
        );
      } finally {
        setLoading(false);
        if (back) navigate(back);
      }
    },
    []
  );

  const handleCreateServer = useCallback(
    async (data: iServerRequest, id: string) => {
      try {
        setLoading(true);
        const query = `?school_id=${id}`;
        await apiUser.create(data, query);
        getServers(id, "", 1);
        handleSucess("Servidor cadastrado com sucesso!");
      } catch {
        handleError("Não foi possível cadastrar o servidor no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteServer = useCallback(
    async (school_id: string, server_id: string) => {
      try {
        setLoading(true);
        await apiSchool.deleteServer(school_id, server_id);
        getSchools(server_id, "", 1);
        handleSucess("Usuário removido da função com sucesso!");
      } catch {
        handleError(
          "Não foi possível remover o usuário removido da função no momento!"
        );
      } finally {
        setUpdateServerData(undefined);
        setLoading(false);
      }
    },
    []
  );

  return (
    <SchoolContext.Provider
      value={{
        director,
        getSchool,
        getServers,
        is_director,
        listSchoolData,
        schoolDataAdminRetrieve,
        schoolDataRetrieve,
        serversData,
        setDirector,
        setListSchoolData,
        setUpdateServerData,
        updateServerData,
        createSchool: handleCreateSchool,
        createServer: handleCreateServer,
        deleteServer: handleDeleteServer,
        updateSchool: handleUpdateSchool,
        importSchool: handleImportSchool,
        clickListSchool,
        setServersData,
        clickRetrieveSchool,
        loadingSchool,
        createSchoolServer: handleCreateSchoolServer,
        schoolId,
        disabled,
        listYear,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
