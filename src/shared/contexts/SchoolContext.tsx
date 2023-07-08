import {
  iChildren,
  iSchool,
  iSchoolClass,
  iSchoolClassRequest,
  iSchoolImportRequest,
  iSchoolServerRequest,
  iSelectBase,
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
import { apiSchool } from "../services";
import { useAuthContext } from "./AuthContext";
import { usePaginationContext } from "./PaginationContext";

interface iSchoolContextData {
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  director: boolean[];
  setDirector: Dispatch<SetStateAction<boolean[]>>;
  is_director: () => "" | "&is_director=true" | "&is_director=false";
  schoolDataRetrieve: (id: string) => void;
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
    query?: string,
    back?: string
  ) => Promise<void>;
  clickRetrieveSchool: (school_id: string, server_id: string) => void;
  loadingSchool: boolean;
  listYear: iYear[] | undefined;
  onClickReset: () => void;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  schoolRetrieve: iSchool | undefined;
  setSchoolRetrieve: Dispatch<SetStateAction<iSchool | undefined>>;
  schoolAdminRetrieve: iSchoolClass | undefined;
  setSchoolAdminRetrieve: Dispatch<SetStateAction<iSchoolClass | undefined>>;
  periods: iSelectBase[] | undefined;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { setSkip, setPage, setActive } = usePaginationContext();
  const [schoolRetrieve, setSchoolRetrieve] = useState<iSchool>();
  const [schoolAdminRetrieve, setSchoolAdminRetrieve] =
    useState<iSchoolClass>();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();
  const [director, setDirector] = useState([true, true]);
  const [loadingSchool, setLoadingSchool] = useState(false);
  const [listYear, setListYear] = useState<iYear[]>();
  const [periods, setPeriods] = useState<iSelectBase[]>();
  const [search, setSearch] = useState<string>();

  const onClickReset = useCallback(() => {
    setDirector([true, true]);
    setActive(true);
    setSearch(undefined);
  }, []);

  const clickRetrieveSchool = useCallback(
    (school_id: string, server_id: string) => {
      setPage(0);
      setSkip(undefined);
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

  const schoolDataRetrieve = useCallback(
    (id: string) => {
      if (yearData) {
        setLoadingSchool(true);
        setLoading(true);
        apiSchool
          .retrieve(id, `?year_id=${yearData.id}`)
          .then((res) => {
            setSchoolRetrieve(res.school);
            setSchoolAdminRetrieve(res.schoolClass);
            setPeriods(res.periods);
            if (res.school.is_dash) {
              setListYear(res.years);
            } else {
              setListYear([yearData]);
            }
          })
          .catch(() => navigate("/"))
          .finally(() => {
            setLoadingSchool(false);
            setLoading(false);
          });
      }
    },
    [yearData]
  );

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
      query?: string,
      back?: string
    ) => {
      try {
        setLoading(true);
        const school = await apiSchool.update(data, id, query);
        setSchoolRetrieve(school);
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

  return (
    <SchoolContext.Provider
      value={{
        director,
        is_director,
        schoolDataRetrieve,
        setDirector,
        setUpdateServerData,
        updateServerData,
        updateSchool: handleUpdateSchool,
        importSchool: handleImportSchool,
        clickRetrieveSchool,
        loadingSchool,
        createSchoolServer: handleCreateSchoolServer,
        listYear,
        createSchoolClass: handleCreateSchoolClass,
        onClickReset,
        search,
        setSearch,
        schoolRetrieve,
        setSchoolRetrieve,
        schoolAdminRetrieve,
        setSchoolAdminRetrieve,
        periods,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
