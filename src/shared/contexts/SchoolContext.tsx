import {
  iChildren,
  iClassSchoolList,
  iSchool,
  iSchoolClassRequest,
  iSchoolImportRequest,
  iSchoolServerRequest,
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
import { apiClass, apiSchool } from "../services";
import { useAuthContext } from "./AuthContext";
import { usePaginationContext, useUserContext } from ".";

interface iSchoolContextData {
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  director: boolean[];
  setDirector: Dispatch<SetStateAction<boolean[]>>;
  is_director: () => "" | "&is_director=true" | "&is_director=false";
  schoolDataRetrieve: (id: string) => void;
  schoolDataAdminRetrieve: (id: string) => void;
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
  schoolId: string | undefined;
  listYear: iYear[] | undefined;
  getClasses: (id: string, query: string, take: number) => void;
  listClassData: iClassSchoolList[] | undefined;
  onClickReset: () => void;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  schoolRetrieve: iSchool | undefined;
  setSchoolRetrieve: Dispatch<SetStateAction<iSchool | undefined>>;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError, mdDown } =
    useAppThemeContext();
  const { yearData, setSchoolDataAdmin } = useAuthContext();
  const { getSchools, setListSchoolServerData } = useUserContext();
  const { setIsLoading, setCount, define_step, setSkip, setPage, setActive } =
    usePaginationContext();
  const [schoolRetrieve, setSchoolRetrieve] = useState<iSchool>();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();
  const [listClassData, setListClassData] = useState<iClassSchoolList[]>();
  const [schoolId, setSchoolId] = useState<string>();
  const [director, setDirector] = useState([true, true]);
  const [loadingSchool, setLoadingSchool] = useState(false);
  const [listYear, setListYear] = useState<iYear[]>();
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
        setSchoolRetrieve(res.school);
        setListYear(res.years);
        if (res.years.length > 0) {
          setSchoolId(res.school.id);
        } else setSchoolId(undefined);
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

  const getClasses = useCallback(
    (id: string, query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiClass
          .listWithSchool(id, query)
          .then((res) => {
            setListClassData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiClass
          .listWithSchool(id, query)
          .then((res) => {
            setListClassData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

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

  const handleCreateSchoolClass = useCallback(
    async (data: iSchoolClassRequest, school_id: string, year_id: string) => {
      try {
        setLoading(true);
        await apiSchool.createClass(data, school_id, year_id);
        handleSucess("A turma foi cadastrada com sucesso na escola!");
        getClasses(school_id, `?year_id=${year_id}`, 1);
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
        schoolDataAdminRetrieve,
        schoolDataRetrieve,
        setDirector,
        setUpdateServerData,
        updateServerData,
        updateSchool: handleUpdateSchool,
        importSchool: handleImportSchool,
        clickRetrieveSchool,
        loadingSchool,
        createSchoolServer: handleCreateSchoolServer,
        schoolId,
        listYear,
        createSchoolClass: handleCreateSchoolClass,
        getClasses,
        listClassData,
        onClickReset,
        search,
        setSearch,
        schoolRetrieve,
        setSchoolRetrieve,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
