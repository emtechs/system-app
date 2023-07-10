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
  iClass,
  iClassRequest,
  iClassSchoolRequest,
  iClassSelect,
  iClassWithSchool,
  iSchoolImportRequest,
  iSelectBase,
  iYear,
} from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "./ThemeContext";
import { FieldValues } from "react-hook-form";
import { apiClass } from "../services";
import { useAuthContext } from "./AuthContext";
import sortArray from "sort-array";

interface iClassContextData {
  createClass: (data: iClassRequest, back?: string) => Promise<void>;
  createClassSchool: (
    data: iClassSchoolRequest,
    year_id: string,
    school_id: string,
    back?: string
  ) => Promise<void>;
  importClass: (data: iSchoolImportRequest, back?: string) => Promise<void>;
  updateClassSchool: (data: FieldValues, back?: string) => Promise<void>;
  classDataSelect: iClassSelect[] | undefined;
  setClassDataSelect: Dispatch<SetStateAction<iClassSelect[] | undefined>>;
  listClassData: iClass[] | undefined;
  setListClassData: Dispatch<SetStateAction<iClass[] | undefined>>;
  classSelect: iClass | undefined;
  setClassSelect: Dispatch<SetStateAction<iClass | undefined>>;
  classWithSchoolSelect: iClassWithSchool | undefined;
  setClassWithSchoolSelect: Dispatch<
    SetStateAction<iClassWithSchool | undefined>
  >;
  classDataRetrieve: (id: string) => void;
  classRetrieve: iClass | undefined;
  loadingClass: boolean;
  listYear: iYear[] | undefined;
  periods: iSelectBase[] | undefined;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
}

const ClassContext = createContext({} as iClassContextData);

export const ClassProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const [classDataSelect, setClassDataSelect] = useState<iClassSelect[]>();
  const [listClassData, setListClassData] = useState<iClass[]>();
  const [classSelect, setClassSelect] = useState<iClass>();
  const [classWithSchoolSelect, setClassWithSchoolSelect] =
    useState<iClassWithSchool>();
  const [classRetrieve, setClassRetrieve] = useState<iClass>();
  const [loadingClass, setLoadingClass] = useState(false);
  const [listYear, setListYear] = useState<iYear[]>();
  const [periods, setPeriods] = useState<iSelectBase[]>();
  const [search, setSearch] = useState<string>();

  const classDataRetrieve = useCallback(
    (id: string) => {
      setLoadingClass(true);
      setLoading(true);
      apiClass
        .retrieve(id)
        .then((res) => {
          setClassRetrieve(res.class);
          setPeriods(
            sortArray<iSelectBase>(res.periods, { by: "label", order: "asc" })
          );
          if (res.years.length > 0) {
            setListYear(res.years);
          } else {
            if (yearData) setListYear([yearData]);
          }
        })
        .catch(() => navigate("/"))
        .finally(() => {
          setLoadingClass(false);
          setLoading(false);
        });
    },
    [yearData]
  );

  const handleCreateClass = useCallback(
    async (data: iClassRequest, back?: string) => {
      try {
        setLoading(true);
        await apiClass.create(data);
        handleSucess("Turma cadastrada com sucesso!");
        navigate(back ? back : "/");
      } catch {
        handleError("Não foi possível cadastrar a turma no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleCreateClassSchool = useCallback(
    async (
      data: iClassSchoolRequest,
      year_id: string,
      school_id: string,
      back?: string
    ) => {
      try {
        setLoading(true);
        await apiClass.createSchool(data, year_id, school_id);
        handleSucess("Escola definida com sucesso!");
        navigate(back ? back : "/");
      } catch {
        handleError("Não foi possível definir a escola no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleImportClass = useCallback(
    async (data: iSchoolImportRequest, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      try {
        setLoading(true);
        await apiClass.impClass(file);
        handleSucess("Turmas importadas com sucesso!");
        navigate(back ? back : "/");
      } catch {
        handleError("Não foi possível importar as turmas no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateClassSchool = useCallback(
    async (data: FieldValues, back?: string) => {
      try {
        setLoading(true);
        await apiClass.updateSchool(data);
        navigate(back ? back : "/");
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <ClassContext.Provider
      value={{
        createClass: handleCreateClass,
        createClassSchool: handleCreateClassSchool,
        importClass: handleImportClass,
        updateClassSchool: handleUpdateClassSchool,
        classDataSelect,
        listClassData,
        classSelect,
        setClassSelect,
        setListClassData,
        setClassDataSelect,
        classWithSchoolSelect,
        setClassWithSchoolSelect,
        classDataRetrieve,
        classRetrieve,
        listYear,
        loadingClass,
        periods,
        search,
        setSearch,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => useContext(ClassContext);
