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
  iClass,
  iClassRequest,
  iClassSelect,
  iFrequency,
  iFrequencyRequest,
  iFrequencyStudents,
  iSchool,
  iSchoolRequest,
  iSchoolSelect,
  iServerRequest,
  iStudentImportRequest,
  iStudentRequest,
} from "../interfaces";
import {
  apiUsingNow,
  patchFrequency,
  patchFrequencyStudent,
  patchSchool,
  postClass,
  postFrequency,
  postImportStudent,
  postSchool,
  postStudent,
  postUser,
} from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from ".";
import { FieldValues } from "react-hook-form";

interface iSchoolContextData {
  createSchool: (data: iSchoolRequest, back?: string) => Promise<void>;
  createServer: (
    data: iServerRequest,
    id: string,
    back?: string
  ) => Promise<void>;
  createClass: (
    data: iClassRequest,
    id: string,
    back?: string
  ) => Promise<void>;
  createStudent: (
    data: iStudentRequest,
    id: string,
    back?: string
  ) => Promise<void>;
  importStudent: (
    data: iStudentImportRequest,
    school_id: string,
    back?: string
  ) => Promise<void>;
  createFrequency: (data: iFrequencyRequest, id: string) => Promise<void>;
  updateSchool: (
    data: FieldValues,
    id: string,
    type: "nome" | "diretor" | "estado",
    back?: string
  ) => Promise<void>;
  updateFrequency: (
    data: FieldValues,
    id: string,
    back?: string
  ) => Promise<void>;
  updateFrequencyStudent: (data: FieldValues, id: string) => Promise<void>;
  schoolDataSelect: iSchoolSelect[] | undefined;
  setSchoolDataSelect: Dispatch<SetStateAction<iSchoolSelect[] | undefined>>;
  schoolSelect: iSchool | undefined;
  setSchoolSelect: Dispatch<SetStateAction<iSchool | undefined>>;
  listSchoolData: iSchool[] | undefined;
  setListSchoolData: Dispatch<SetStateAction<iSchool[] | undefined>>;
  classDataSelect: iClassSelect[] | undefined;
  setClassDataSelect: Dispatch<SetStateAction<iClassSelect[] | undefined>>;
  listClassData: iClass[] | undefined;
  setListClassData: Dispatch<SetStateAction<iClass[] | undefined>>;
  frequencyData: iFrequency | undefined;
  setFrequencyData: Dispatch<SetStateAction<iFrequency | undefined>>;
  studentData: iFrequencyStudents | undefined;
  setStudentData: Dispatch<SetStateAction<iFrequencyStudents | undefined>>;
  classSelect: iClass | undefined;
  setClassSelect: Dispatch<SetStateAction<iClass | undefined>>;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchoolSelect[]>();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [classDataSelect, setClassDataSelect] = useState<iClassSelect[]>();
  const [listClassData, setListClassData] = useState<iClass[]>();
  const [schoolSelect, setSchoolSelect] = useState<iSchool>();
  const [classSelect, setClassSelect] = useState<iClass>();
  const [frequencyData, setFrequencyData] = useState<iFrequency>();
  const [studentData, setStudentData] = useState<iFrequencyStudents>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchool[]>("schools?is_active=true")
      .then((res) => {
        if (res.data) {
          setListSchoolData(res.data);
          setSchoolDataSelect(
            res.data.map((school) => {
              return { ...school, label: school.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
    apiUsingNow
      .get<iClass[]>(`classes?school_id=${schoolSelect?.id}&is_active=true`)
      .then((res) => {
        if (res.data) {
          setListClassData(res.data);
          setClassDataSelect(
            res.data.map((el) => {
              return { ...el, label: el.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, [schoolSelect]);

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

  const handleCreateClass = useCallback(
    async (data: iClassRequest, id: string, back?: string) => {
      try {
        setLoading(true);
        await postClass(data, id);
        toast.success("Turma cadastrada com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar a turma no momento!");
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

  const handleCreateFrequency = useCallback(
    async (data: iFrequencyRequest, id: string) => {
      try {
        setLoading(true);
        const frequency = await postFrequency(data, id);
        toast.success("Frequência cadastrado com sucesso!");
        setFrequencyData(frequency);
        setLoading(false);
        navigate("/frequency/retrieve");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar a frequência no momento!");
      }
    },
    []
  );

  const handleUpdateFrequency = useCallback(
    async (data: FieldValues, id: string, back?: string) => {
      try {
        setLoading(true);
        await patchFrequency(data, id);
        toast.success("Frequência realizada com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível realizar a frequência no momento!");
      }
    },
    []
  );

  const handleUpdateStudentFrequency = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        await patchFrequencyStudent(data, id);
        toast.success("Falta cadastrada com sucesso!");
        setStudentData(undefined);
        setLoading(false);
      } catch {
        setStudentData(undefined);
        setLoading(false);
        toast.error("Não foi possível cadastrar a falta no momento!");
      }
    },
    []
  );

  return (
    <SchoolContext.Provider
      value={{
        createSchool: handleCreateSchool,
        createServer: handleCreateServer,
        createClass: handleCreateClass,
        createStudent: handleCreateStudent,
        importStudent: handleImportStudent,
        createFrequency: handleCreateFrequency,
        updateSchool: handleUpdateSchool,
        updateFrequency: handleUpdateFrequency,
        updateFrequencyStudent: handleUpdateStudentFrequency,
        schoolDataSelect,
        setSchoolDataSelect,
        listSchoolData,
        setListSchoolData,
        frequencyData,
        setFrequencyData,
        studentData,
        setStudentData,
        schoolSelect,
        setSchoolSelect,
        classDataSelect,
        listClassData,
        classSelect,
        setClassSelect,
        setListClassData,
        setClassDataSelect,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
