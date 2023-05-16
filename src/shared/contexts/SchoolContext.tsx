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
  iSchoolRequest,
  iStudentRequest,
} from "../interfaces";
import {
  patchFrequency,
  patchFrequencyStudent,
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
  createSchool: (data: iSchoolRequest) => Promise<void>;
  createServer: (data: iSchoolRequest, id: string) => Promise<void>;
  createClass: (data: iClassRequest, id: string) => Promise<void>;
  createStudent: (data: iStudentRequest, id: string) => Promise<void>;
  createFrequency: (data: iFrequencyRequest, id: string) => Promise<void>;
  updateFrequency: (data: FieldValues, id: string) => Promise<void>;
  updateFrequencyStudent: (data: FieldValues, id: string) => Promise<void>;
  frequencyData: iFrequency | undefined;
  setFrequencyData: Dispatch<SetStateAction<iFrequency | undefined>>;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [frequencyData, setFrequencyData] = useState<iFrequency>();

  const handleCreateSchool = useCallback(async (data: iSchoolRequest) => {
    try {
      setLoading(true);
      await postSchool(data);
      toast.success("Escola cadastrada com sucesso!");
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
      toast.error("Não foi possível cadastrar a escola no momento!");
    }
  }, []);

  const handleCreateServer = useCallback(
    async (data: iSchoolRequest, id: string) => {
      try {
        setLoading(true);
        await postServer(data, id);
        toast.success("Servidor cadastrado com sucesso!");
        setLoading(false);
        navigate("/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar o servidor no momento!");
      }
    },
    []
  );

  const handleCreateClass = useCallback(
    async (data: iClassRequest, id: string) => {
      try {
        setLoading(true);
        await postClass(data, id);
        toast.success("Turma cadastrada com sucesso!");
        setLoading(false);
        navigate("/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar a turma no momento!");
      }
    },
    []
  );

  const handleCreateStudent = useCallback(
    async (data: iStudentRequest, id: string) => {
      try {
        setLoading(true);
        await postStudent(data, id);
        toast.success("Estudante cadastrado com sucesso!");
        setLoading(false);
        navigate("/");
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
        await postFrequency(data, id);
        toast.success("Frequência cadastrado com sucesso!");
        setLoading(false);
        navigate("/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar a frequência no momento!");
      }
    },
    []
  );

  const handleUpdateFrequency = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        await patchFrequency(data, id);
        toast.success("Frequência realizada com sucesso!");
        setLoading(false);
        navigate("/");
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
        setLoading(false);
      } catch {
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
        updateFrequency: handleUpdateFrequency,
        updateFrequencyStudent: handleUpdateStudentFrequency,
        frequencyData,
        setFrequencyData,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
