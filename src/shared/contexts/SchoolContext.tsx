import {
  iChildren,
  iLocale,
  iSchool,
  iSchoolClassRequest,
  iSchoolImportRequest,
  iSchoolServerRequest,
  iSelectBase,
  iWorkSchool,
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
import { useAuthContext } from "./AuthContext";
import { apiAuth, apiSchool } from "../services";
import { usePaginationContext } from "./PaginationContext";

interface iSchoolContextData {
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  importSchool: (data: iSchoolImportRequest, back?: string) => Promise<void>;
  createSchoolClass: (
    data: iSchoolClassRequest,
    school_id: string,
    year_id: string
  ) => Promise<void>;
  createSchoolServer: (
    data: iSchoolServerRequest,
    server_id: string
  ) => Promise<void>;
  updateSchool: (
    data: FieldValues,
    id: string,
    type: "nome" | "diretor" | "estado",
    locale: iLocale,
    query?: string,
    back?: string
  ) => Promise<void>;
  schoolSelect: iSelectBase | undefined;
  verifySchool: (id: string) => void;
  schoolDataRetrieve: (id: string, query: string) => void;
  schoolRetrieve: iSchool | undefined;
  loadingSchool: boolean;
  getSchools: (query_schools: string) => void;
  listData: iSchool[];
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { setListYear, yearData } = useAuthContext();
  const { setIsLoading, setCount } = usePaginationContext();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();
  const [schoolSelect, setSchoolSelect] = useState<iSelectBase>();
  const [schoolRetrieve, setSchoolRetrieve] = useState<iSchool>();
  const [loadingSchool, setLoadingSchool] = useState(false);
  const [listData, setListData] = useState<iSchool[]>([]);

  const getSchools = useCallback((query_schools: string) => {
    setIsLoading(true);
    apiSchool
      .list(query_schools)
      .then((res) => {
        setListData(res.result);
        setCount(res.total);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const verifySchool = useCallback(
    (id: string) => {
      setLoading(true);
      apiAuth
        .verify(`?school_id=${id}`)
        .then((res) => {
          setSchoolSelect(res.select);
          if (res.years) {
            if (res.years.length > 0) {
              setListYear(res.years);
            } else if (yearData) {
              setListYear([yearData]);
            }
          }
        })
        .catch(() => navigate("/"))
        .finally(() => setLoading(false));
    },
    [yearData]
  );

  const schoolDataRetrieve = useCallback((id: string, query: string) => {
    setLoadingSchool(true);
    apiSchool
      .retrieve(id, query)
      .then((res) => setSchoolRetrieve(res))
      .finally(() => setLoadingSchool(false));
  }, []);

  const handleCreateSchoolServer = useCallback(
    async (data: iSchoolServerRequest, server_id: string) => {
      try {
        setLoading(true);
        await apiSchool.createServer(data, server_id);
        handleSucess("O servidor foi cadastrada com sucesso na escola!");
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

  const handleCreateSchoolClass = useCallback(
    async (data: iSchoolClassRequest, school_id: string, year_id: string) => {
      try {
        setLoading(true);
        await apiSchool.createClass(data, school_id, year_id);
        handleSucess("A turma foi cadastrada com sucesso na escola!");
      } catch {
        handleError(
          "No momento, não foi possível cadastrar a turma na escola. Por favor, tente novamente mais tarde."
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
      locale: iLocale,
      query?: string,
      back?: string
    ) => {
      try {
        setLoading(true);
        await apiSchool.update(data, id, query);
        handleSucess(`Sucesso ao alterar o ${type} da Escola!`);
        switch (locale) {
          case "data":
            schoolDataRetrieve(id, "");
            break;

          case "list":
            getSchools("?is_active=true");
            break;
        }
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

  return (
    <SchoolContext.Provider
      value={{
        setUpdateServerData,
        updateServerData,
        updateSchool: handleUpdateSchool,
        importSchool: handleImportSchool,
        createSchoolServer: handleCreateSchoolServer,
        createSchoolClass: handleCreateSchoolClass,
        schoolSelect,
        verifySchool,
        loadingSchool,
        schoolDataRetrieve,
        schoolRetrieve,
        getSchools,
        listData,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
