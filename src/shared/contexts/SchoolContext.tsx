import {
  iChildren,
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
import { apiSchool } from "../services";
import { useAuthContext } from "./AuthContext";
import sortArray from "sort-array";

interface iSchoolContextData {
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
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
  loadingSchool: boolean;
  schoolRetrieve: iSchool | undefined;
  setSchoolRetrieve: Dispatch<SetStateAction<iSchool | undefined>>;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { yearData, setPeriods, setListYear } = useAuthContext();
  const [schoolRetrieve, setSchoolRetrieve] = useState<iSchool>();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();
  const [loadingSchool, setLoadingSchool] = useState(false);

  const schoolDataRetrieve = useCallback(
    (id: string) => {
      if (yearData) {
        setLoadingSchool(true);
        setLoading(true);
        apiSchool
          .retrieve(id, `?year_id=${yearData.id}`)
          .then((res) => {
            setSchoolRetrieve(res.school);
            setPeriods(
              sortArray<iSelectBase>(res.periods, { by: "label", order: "asc" })
            );
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
        schoolDataRetrieve,
        setUpdateServerData,
        updateServerData,
        updateSchool: handleUpdateSchool,
        importSchool: handleImportSchool,
        loadingSchool,
        createSchoolServer: handleCreateSchoolServer,
        createSchoolClass: handleCreateSchoolClass,
        schoolRetrieve,
        setSchoolRetrieve,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
