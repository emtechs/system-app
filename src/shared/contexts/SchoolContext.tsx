import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  iChildren,
  iSchool,
  iSchoolImportRequest,
  iSchoolRequest,
  iSchoolSelect,
  iServerRequest,
  iStudentImportRequest,
  iStudentRequest,
} from "../interfaces";
import {
  apiUsingNow,
  patchSchool,
  patchStudent,
  postImportSchool,
  postImportStudent,
  postImportStudentAll,
  postSchool,
  postStudent,
  postUser,
} from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from ".";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

interface iSchoolContextData {
  createSchool: (data: iSchoolRequest, back?: string) => Promise<void>;
  importSchool: (data: iSchoolImportRequest, back?: string) => Promise<void>;
  createServer: (
    data: iServerRequest,
    id: string,
    back?: string
  ) => Promise<void>;
  createStudent: (
    data: iStudentRequest,
    id: string,
    back?: string
  ) => Promise<void>;
  updateStudent: (data: FieldValues, id: string) => Promise<void>;
  importStudent: (
    data: iStudentImportRequest,
    school_id: string,
    back?: string
  ) => Promise<void>;
  importStudentAll: (
    data: iStudentImportRequest,
    back?: string
  ) => Promise<void>;
  updateSchool: (
    data: FieldValues,
    id: string,
    type: "nome" | "diretor" | "estado",
    back?: string
  ) => Promise<void>;
  schoolDataSelect: iSchoolSelect[] | undefined;
  setSchoolDataSelect: Dispatch<SetStateAction<iSchoolSelect[] | undefined>>;
  schoolSelect: iSchool | undefined;
  setSchoolSelect: Dispatch<SetStateAction<iSchool | undefined>>;
  listSchoolData: iSchool[] | undefined;
  setListSchoolData: Dispatch<SetStateAction<iSchool[] | undefined>>;
  schoolYear: string | undefined;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchoolSelect[]>();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [schoolSelect, setSchoolSelect] = useState<iSchool>();
  const [schoolYear, setSchoolYear] = useState<string>();

  useEffect(() => {
    const year = dayjs().year();
    setLoading(true);
    apiUsingNow
      .get<{ id: string }>(`/schools/year/${year}`)
      .then((res) => {
        setSchoolYear(res.data.id);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreateSchool = useCallback(
    async (data: iSchoolRequest, back?: string) => {
      try {
        setLoading(true);
        await postSchool(data);
        toast.success("Escola cadastrada com sucesso!");
      } catch {
        toast.error("Não foi possível cadastrar a escola no momento!");
      } finally {
        setLoading(false);
        navigate(back ? back : "/");
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
        await postImportSchool(file);
        toast.success("Escolas importadas com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível importar as escolas no momento!");
      }
    },
    []
  );

  const handleUpdateSchool = useCallback(
    async (
      data: FieldValues,
      id: string,
      type: "nome" | "diretor" | "estado",
      back?: string
    ) => {
      try {
        setLoading(true);
        await patchSchool(data, id);
        toast.success(`Sucesso ao alterar o ${type} da Escola!`);
      } catch {
        toast.error(
          `Não foi possível atualizar o ${type} da escola no momento!`
        );
      } finally {
        setSchoolSelect(undefined);
        setLoading(false);
        if (back) navigate(back);
      }
    },
    []
  );

  const handleCreateServer = useCallback(
    async (data: iServerRequest, id: string, back?: string) => {
      try {
        setLoading(true);
        const query = `?school_id=${id}`;
        await postUser(data, query);
        toast.success("Servidor cadastrado com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar o servidor no momento!");
      }
    },
    []
  );

  const handleCreateStudent = useCallback(
    async (data: iStudentRequest, id: string, back?: string) => {
      try {
        setLoading(true);
        await postStudent(data, id);
        toast.success("Estudante cadastrado com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar o estudante no momento!");
      }
    },
    []
  );

  const handleUpdateStudent = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        await patchStudent(data, id);
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleImportStudent = useCallback(
    async (data: iStudentImportRequest, school_id: string, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      const class_id = data.class_id ? data.class_id : "";
      try {
        setLoading(true);
        await postImportStudent(file, class_id, school_id);
        toast.success("Estudantes importados com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível importar os estudantes no momento!");
      }
    },
    []
  );

  const handleImportStudentAll = useCallback(
    async (data: iStudentImportRequest, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      try {
        setLoading(true);
        await postImportStudentAll(file);
        toast.success("Estudantes importados com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível importar os estudantes no momento!");
      }
    },
    []
  );

  return (
    <SchoolContext.Provider
      value={{
        createSchool: handleCreateSchool,
        importSchool: handleImportSchool,
        createServer: handleCreateServer,
        createStudent: handleCreateStudent,
        updateStudent: handleUpdateStudent,
        importStudent: handleImportStudent,
        importStudentAll: handleImportStudentAll,
        updateSchool: handleUpdateSchool,
        schoolDataSelect,
        setSchoolDataSelect,
        listSchoolData,
        setListSchoolData,
        schoolSelect,
        setSchoolSelect,
        schoolYear,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
