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
  iClassRequest,
  iFrequency,
  iFrequencyRequest,
  iFrequencyStudents,
  iSchool,
  iSchoolRequest,
  iServerRequest,
  iStudentRequest,
} from "../interfaces";
import {
  patchFrequency,
  patchFrequencyStudent,
  patchSchool,
  postClass,
  postFrequency,
  postSchool,
  postServer,
  postStudent,
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
  createFrequency: (data: iFrequencyRequest, id: string) => Promise<void>;
  updateSchool: (data: FieldValues, id: string) => Promise<void>;
  updateFrequency: (
    data: FieldValues,
    id: string,
    back?: string
  ) => Promise<void>;
  updateFrequencyStudent: (data: FieldValues, id: string) => Promise<void>;
  schoolSelect: iSchool | undefined;
  setschoolSelect: Dispatch<SetStateAction<iSchool | undefined>>;
  frequencyData: iFrequency | undefined;
  setFrequencyData: Dispatch<SetStateAction<iFrequency | undefined>>;
  studentData: iFrequencyStudents | undefined;
  setStudentData: Dispatch<SetStateAction<iFrequencyStudents | undefined>>;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [schoolSelect, setschoolSelect] = useState<iSchool>();
  const [frequencyData, setFrequencyData] = useState<iFrequency>();
  const [studentData, setStudentData] = useState<iFrequencyStudents>();

  const handleCreateSchool = useCallback(
    async (data: iSchoolRequest, back?: string) => {
      try {
        setLoading(true);
        await postSchool(data);
        toast.success("Escola cadastrada com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar a escola no momento!");
      }
    },
    []
  );

  const handleUpdateSchool = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        const school = await patchSchool(data, id);
        setschoolSelect(school);
        toast.success("Sucesso ao alterar o estado da Escola!");
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error(
          "Não foi possível atualizar o estado da escola no momento!"
        );
      }
    },
    []
  );

  const handleCreateServer = useCallback(
    async (data: iServerRequest, id: string, back?: string) => {
      try {
        setLoading(true);
        await postServer(data, id);
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
        createFrequency: handleCreateFrequency,
        updateSchool: handleUpdateSchool,
        updateFrequency: handleUpdateFrequency,
        updateFrequencyStudent: handleUpdateStudentFrequency,
        frequencyData,
        setFrequencyData,
        studentData,
        setStudentData,
        schoolSelect,
        setschoolSelect,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
